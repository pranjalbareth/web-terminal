const fakeFileSystem = {
    "/": {
        bin: {}, boot: {}, dev: {}, etc: {}, home: {}, lib: {}, media: {},
        mnt: {}, opt: {}, proc: {}, root: {}, run: {}, sbin: {}, srv: {},
        sys: {}, tmp: {}, usr: {}, var: {}
    }
};

let currentPath = ["/", "home"]; // Start at `/home`

function getCurrentFolder() {
    return currentPath.reduce((folder, key) => folder[key], fakeFileSystem);
}

function resetFileSystem() {
    fakeFileSystem["/"].home = {}; // Reset `/home`
    currentPath = ["/", "home"];
}

const allowedCommands = {
    ls: () => {
        const folder = getCurrentFolder();
        const contents = Object.keys(folder);
        return contents.length > 0 ? contents.join("\n") : "(empty)";
    },
    pwd: () => currentPath.join("/").replace("//", "/"), // Clean up root path
    whoami: () => process.env.USERNAME || process.env.USER || "user",
    echo: (args) => args.join(" "),

    mkdir: (args) => {
        if (args.length === 0) return "Error: Missing directory name.";
        const folder = getCurrentFolder();
        if (folder[args[0]]) return "Error: Directory already exists.";
        folder[args[0]] = {}; // Create new folder
        return `Directory '${args[0]}' created.`;
    },

    rmdir: (args) => {
        if (args.length === 0) return "Error: Missing directory name.";
        const folder = getCurrentFolder();
        if (!folder[args[0]]) return "Error: Directory not found.";
        if (Object.keys(folder[args[0]]).length > 0) return "Error: Directory is not empty.";
        delete folder[args[0]];
        return `Directory '${args[0]}' removed.`;
    },

    touch: (args) => {
        if (args.length === 0) return "Error: Missing file name.";
        const folder = getCurrentFolder();
        if (folder[args[0]]) return "Error: File already exists.";
        folder[args[0]] = "fake-file";
        return `File '${args[0]}' created.`;
    },

    cat: (args) => {
        if (args.length === 0) return "Error: Missing file name.";
        const folder = getCurrentFolder();
        if (!folder[args[0]]) return "Error: File not found.";
        return folder[args[0]];
    },

    rm: (args) => {
        if (args.length === 0) return "Error: Missing file name.";
        const folder = getCurrentFolder();
        if (!folder[args[0]]) return "Error: File not found.";
        if (typeof folder[args[0]] === "object") return "Error: Cannot remove a directory with 'rm'. Use 'rmdir'.";
        delete folder[args[0]];
        return `File '${args[0]}' removed.`;
    },

    cd: (args) => {
        if (args.length === 0) return "Error: Missing directory name.";
        const target = args[0];

        if (target === "..") {
            if (currentPath.length > 1) {
                currentPath.pop();
                return `Moved to ${allowedCommands.pwd()}`;
            }
            return "Already at root `/`.";
        }

        const folder = getCurrentFolder();
        if (!folder[target] || typeof folder[target] !== "object") {
            return "Error: No such directory.";
        }

        if (currentPath.length === 1 && target !== "home") {
            return "Permission denied.";
        }

        currentPath.push(target);
        return `Moved to ${allowedCommands.pwd()}`;
    },

    reset: () => {
        resetFileSystem();
        return "File system reset. /home is now empty.";
    },

    uname: () => "Linux version 5.10.16 (fake-uname)",
    history: () => "History feature not implemented yet.",

    help: () => {
        return `
<span style='color:#ffb500'>Available Commands:</span>
<span style='color:#ffb500'>---------------------------------------------</span>
<span style='color:#ffb500'>📂 File & Directory Management:</span>
<span style='color:rgb(255, 230, 0)'>ls</span>                <span style='color:#fff4c2;'>List files in the current directory</span>
<span style='color:rgb(255, 230, 0)'>pwd</span>               <span style='color:#fff4c2;'>Show the current directory path</span>
<span style='color:rgb(255, 230, 0)'>mkdir &lt;dir&gt;</span>       <span style='color:#fff4c2;'>Create a new directory</span>
<span style='color:rgb(255, 230, 0)'>rmdir &lt;dir&gt;</span>       <span style='color:#fff4c2;'>Remove an empty directory</span>
<span style='color:rgb(255, 230, 0)'>touch &lt;file&gt;</span>      <span style='color:#fff4c2;'>Create a new file</span>
<span style='color:rgb(255, 230, 0)'>rm &lt;file&gt;</span>         <span style='color:#fff4c2;'>Remove a file</span>

<span style='color:#ffb500'>📌 Navigation:</span>
<span style='color:rgb(255, 230, 0)'>cd &lt;dir&gt;</span>          <span style='color:#fff4c2;'>Change directory</span>
<span style='color:rgb(255, 230, 0)'>cd..</span>              <span style='color:#fff4c2;'>Go back one directory</span>

<span style='color:#ffb500'>🖥️ System Info:</span>
<span style='color:rgb(255, 230, 0)'>whoami</span>            <span style='color:#fff4c2;'>Show the current user</span>
<span style='color:rgb(255, 230, 0)'>uname</span>             <span style='color:#fff4c2;'>Show system information</span>

<span style='color:#ffb500'>📜 Utilities:</span>
<span style='color:rgb(255, 230, 0)'>echo &lt;text&gt;</span>       <span style='color:#fff4c2;'>Print text to terminal</span>
<span style='color:rgb(255, 230, 0)'>cat &lt;file&gt;</span>        <span style='color:#fff4c2;'>Display file contents</span>
`;
    }
};

function getCommand(cmd, args) {
    return allowedCommands[cmd] ? allowedCommands[cmd](args) : null;
}

export default getCommand ;
