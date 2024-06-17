import React, { useEffect, useState, useRef } from "react";
import Quill from "quill";
import { pdfExporter } from "quill-to-pdf";
import { saveAs } from "file-saver";
import "quill/dist/quill.snow.css";
import io from "socket.io-client";
import { useParams } from "react-router-dom";
import UserList from "../components/UserList";
import { TOOLBAR_OPTIONS } from "../constants/constants";

const DocumentEditor = () => {
  const [socket, setSocket] = useState(null);
  const [quill, setQuill] = useState(null);
  const [docTitle, setDocTitle] = useState("New Document");
  const [onlineUsers, setOnlineUsers] = useState([]);

  const wrapperRef = useRef();
  const { id: docId } = useParams();

  // Connect to socket
  useEffect(() => {
    const s = io("http://localhost:3000");
    setSocket(s);

    return () => {
      s.disconnect();
    };
  }, []);

  // Save document
  useEffect(() => {
    if (socket == null || quill == null) return;

    const interval = setInterval(() => {
      socket.emit("save-document", {
        title: docTitle,
        data: quill.getContents(),
      });
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [socket, quill, docTitle]);

  // Load document
  useEffect(() => {
    if (quill == null || socket == null) return;

    socket.once("load-document", (document) => {
      quill.setContents(document.data);
      setDocTitle(document.title);
      quill.enable();
    });

    socket.emit("get-document", docId);
  }, [docId, socket, quill]);

  // Listen for changes
  useEffect(() => {
    if (quill == null || socket == null) return;

    const handleChanges = (delta) => {
      quill.updateContents(delta);
    };

    socket.on("receive-changes", handleChanges);

    return () => {
      socket.off("receive-changes", handleChanges);
    };
  }, [socket, quill]);

  // Send changes
  useEffect(() => {
    if (quill == null || socket == null) return;

    const handleChanges = (delta, oldDelta, source) => {
      if (source !== "user") return;
      socket.emit("send-changes", delta);
    };

    quill.on("text-change", handleChanges);

    return () => {
      quill.off("text-change", handleChanges);
    };
  }, [socket, quill]);

  // Initialize Quill
  useEffect(() => {
    wrapperRef.current.innerHTML = "";
    const editor = document.createElement("div");
    wrapperRef.current.append(editor);

    const q = new Quill(editor, {
      theme: "snow",
      modules: { toolbar: TOOLBAR_OPTIONS },
    });
    q.disable();
    q.setText("Loading ...");
    setQuill(q);
  }, []);

  // Handle online users
  useEffect(() => {
    if (socket == null) return;

    const updateOnlineUsers = (users) => {
      setOnlineUsers(users);
    };

    socket.on("update-online-users", updateOnlineUsers);

    return () => {
      socket.off("update-online-users", updateOnlineUsers);
    };
  }, [socket]);

  // export Pdf
  const exportAsPDF = async () => {
    const delta = quill.getContents();
    const pdfAsBlob = await pdfExporter.generatePdf(delta);
    const fileName = docTitle + ".pdf";
    saveAs(pdfAsBlob, fileName);
  };

  return (
    <div className="container max-w-screen-xl mx-auto p-4 pb-8">
      <div className="flex flex-col gap-4">
        <UserList
          docTitle={docTitle}
          setDocTitle={setDocTitle}
          onlineUsers={onlineUsers}
          socket={socket}
          exportAsPDF={exportAsPDF}
        />
        <div id="editor" ref={wrapperRef}></div>
      </div>
    </div>
  );
};

export default DocumentEditor;
