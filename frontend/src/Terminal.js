import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

function Terminal() {
    const [command, setCommand] = useState("");
    const [output, setOutput] = useState([]);
    const [history, setHistory] = useState([]);
    const terminalRef = useRef(null);

    useEffect(() => {
        axios.get("https://web-terminal-dwo9.onrender.com/history")
            .then(res => setHistory(res.data.history))
            .catch(err => console.error(err));
    }, []);

    useEffect(() => {
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    }, [output]);

    const runCommand = async () => {
        if (!command.trim()) return;
        try {
            const res = await axios.post("https://web-terminal-dwo9.onrender.com/run", { input: command });
            setOutput([...output, `<span style='color: #00FF00'>pranjal@kiwi:~$</span> ${command}`, `<span>${res.data.output}</span>`]);
            setHistory([...history, { command, output: res.data.output }]);
            setCommand("");
        } catch (err) {
            setOutput([...output, `<span style='color: #00FF00'>pranjal@kiwi:~$</span> ${command}`, `<span>Error running command!</span>`]);
        }
    };

    return (
        <div style={{
            backgroundColor: "black",
            color: "white",
            width: "100vw",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            fontFamily: "monospace",
            padding: "10px",
            boxSizing: "border-box",
            overflowY: "auto"
        }} ref={terminalRef}>
            {output.map((line, index) => (
                <pre style={{ margin: "10px 0 0 0" }} key={index} dangerouslySetInnerHTML={{ __html: line }}></pre>
            ))}
            <div style={{ margin: "10px 0 0 0" }}>
                <span style={{ color: "#00FF00" }}>pranjal@kiwi:~$ </span>
                <input
                    style={{
                        backgroundColor: "black",
                        color: "white",
                        border: "none",
                        outline: "none",
                        fontFamily: "monospace",
                        width: "80%"
                    }}
                    type="text"
                    value={command}
                    onChange={(e) => setCommand(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && runCommand()}
                    autoFocus
                />
            </div>
        </div>
    );
}

export default Terminal;
