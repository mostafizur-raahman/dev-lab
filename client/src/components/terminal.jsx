import { Terminal as XTerminal } from "@xterm/xterm";
import { useEffect, useRef } from "react";
import "@xterm/xterm/css/xterm.css";
const Terminal = () => {
    const terminalRef = useRef();
    const isRenderd = useRef(false);

    useEffect(() => {
        // Rendered one time
        if (isRenderd.current) return;
        isRenderd.current = true;

        const terminal = new XTerminal({
            rows: 20,
        });
        terminal.open(terminalRef.current);

        terminal.onData((data) => {
            console.log("Data ", data);
        });
    }, []);

    return <div ref={terminalRef} id="terminal"></div>;
};

export default Terminal;
