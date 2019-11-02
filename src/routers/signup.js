const fs = require('fs');
const path = require('path');

module.exports = async (req,res) =>{
    if(req.method == 'POST'){
        res.writeHead(200, {"Content-Type": "application/json"});

        const filePath = path.join(__dirname,'..','db','users.json');
        
        let error = [];

        // Validation
        if(!req.body.username){
            error.push('No name');
        }
        if(!req.body.telephone){
            error.push('No phone');
        }
        if(!req.body.password){
            error.push('No password');
        }
        if(!req.body.email){
            error.push('No email');
        }

        // If we have any error, return error array
        if(error.length > 0)
            return JSON.stringify(error);

        // Create new users
        const user = {
            user: {
                username:  req.body.username,
                telephone: req.body.telephone,
                password:  req.body.password,
                email:     req.body.email,
            }
        }

        
        return new Promise((resolve, rejesct) => {
            
            let users = [];
            // If we have users, we get them
            if(fs.existsSync(filePath)){
                users = JSON.parse(fs.readFileSync(filePath, 'utf8'));
            }

            // And we must add new users to array
            users.push(user);

            user.status = "success";
            
            const buffer = Buffer.from(JSON.stringify(users));
            // write the user
            fs.open(filePath, 'w', (err, fd)=>{
                if(err)
                    throw 'could not open file: ' + err;
                
                // Write content
                fs.write(fd, buffer, 0, buffer.length, null, (err) => {
                    if (err) throw 'error writing file: ' + err;
                    
                    // Завершить изменение файла
                    fs.close(fd, () => {
                        resolve(JSON.stringify(user));
                    });
                });            
            });

            /*
            fs.writeFile(filePath, JSON.stringify(users),(err)=>{
                if(err)
                    console.error(err);
                
                resolve(user);
            });
            */
        });
    }else{
        res.writeHead(200, {"Content-Type": "text/html"});
        return `It is only post`;
    }
    
}