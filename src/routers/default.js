module.exports = (req,res) =>{

    res.writeHead(200, {"Content-Type": "text/html"});

    return `
        <h1>Home page</h1>
    `;
}