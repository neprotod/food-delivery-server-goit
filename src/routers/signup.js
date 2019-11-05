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

        
        return new Promise(async (resolve, reject) => {
            try{
                // If we have users, we get them
                const readFile = new Promise((resol)=>{
                    fs.stat(filePath, (err, stats)=>{
                        if(err)
                            return reject(err);
                        if(!stats){
                            return resol([]);
                        }

                        fs.readFile(filePath,(err, data)=>{
                            if(err)
                                return reject(err);
                            
                            try{
                                // To get string because empty file is buffer
                                data = data.toString();

                                if(!data){
                                    return resol([]);
                                }
                                return resol(JSON.parse(data));
                            }catch(e){
                                reject(e);
                            }
                        });

                    });
                });
                
                let users = await readFile;

                // And we must add new users to array
                users.push(user);

                user.status = "success";
                
                const buffer = Buffer.from(JSON.stringify(users));
                // write the user
                fs.open(filePath, 'w', (err, fd)=>{
                    if(err)
                        return reject('could not open file: ' + err);
                    
                    // Write content
                    fs.write(fd, buffer, 0, buffer.length, null, (err) => {
                        if (err) 
                            return reject('error writing file: ' + err);
                        
                        // Finished modifying the file
                        fs.close(fd, () => {
                            return resolve(JSON.stringify(user));
                        });
                    });            
                });
            }catch(e){
                return reject(e);
            }
        });
    }else{
        res.writeHead(200, {"Content-Type": "text/html"});
        return `It is only post`;
    }
    
}