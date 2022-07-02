const createCommand = (obj) => {
    var cmdArray = [];
    cmdArray.push(obj.entrypoint);
    const args = obj.arguments;
    for (var key of Object.keys(args)) cmdArray.push("--"+key+" "+args[key]);
    return cmdArray.join(" ");
};

module.exports = {
    createCommand: createCommand
}