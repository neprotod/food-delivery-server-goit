module.exports = {
    /**
     * Get all error messages from validation
     * 
     * @param  {Object} validation schema from hepi
     * @return {Object} all error messages 
     */
    getMessages(validation){
        if(!validation.error)
            return false;
        
        const allMessage = [];
        
        for(const detail of validation.error.details){
            allMessage.push(detail.message);
        }

        return allMessage;
    }
}