const createCommand = (obj) => {
    var cmdArray = [];
    const args = obj.arguments;
    cmdArray.push(obj.entrypoint);
    for (var key of Object.keys(args)) cmdArray.push("--"+key+" "+args[key]);
    return cmdArray.join(" ");
};

module.exports = {
    createCommand: createCommand
}