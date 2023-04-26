class account {
    constructor(
        accountId,
        username, 
        fullName, 
        email, 
        dayOfBirthday,
        avatar, 
        gender = 0, 
        isBlocked = false
    ){
        this.accountId = accountId;
        this.username = username;
        this.fullName = fullName;
        this.isBlocked = isBlocked;
        this.email = email;
        this.gender = gender;
        this.dayOfBirthday = dayOfBirthday;
        this.avatar = avatar;
    }
       
}

module.exports = account;