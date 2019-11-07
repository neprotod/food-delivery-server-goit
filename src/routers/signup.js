const fs = require('fs');
const path = require('path');

const getFile = async (filePath)=>{
    // If we have users, we get them
    return new Promise((resolve, reject)=>{
        fs.stat(filePath, (err, stats)=>{
            if(!stats){
                return resolve([]);
            }
            
            fs.readFile(filePath,(err, data)=>{
                if(err)
                    return reject(err);
                
                try{
                    // To get string because empty file is buffer
                    data = data.toString();

                    if(!data){
                        return resolve([]);
                    }
                    return resolve(JSON.parse(data));
                }catch(e){
                    reject(e);
                }
            });

        });
    }).catch((e)=> console.error('errorrrr',e));
}

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

        // Read file for add new users order
        let users = await getFile(filePath);

        console.log(users);
        // And we must add new users to array
        users.push(user);

        user.status = "success";

        const buffer = Buffer.from(JSON.stringify(users));

        return new Promise(async (resolve, reject) => {
            try{
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
        }).catch((e)=> console.error('err', e));
    }else{
        res.writeHead(200, {"Content-Type": "text/html"});
        return `It is only post`;
    }
    
}