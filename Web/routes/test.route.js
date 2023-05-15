let express = require('express');
let router = express.Router();


var axios = require('axios');

const instance = axios.create({baseURL: `http://localhost:3001/api/v1/`});

async function getToken() {
    try {
      const response = await instance.post('/login', {
        username: 'admin',
        password: 'admin_'
      }, {withCredentials: true})
      return response.data.token;
    } catch (error) {
      console.error(error);
    }
  }

let token = null;

router.get("/login", async (req, res) => {
    token = await getToken();
    res.send(token);
})

router.get("/user", async (req, res) => {
    http://localhost:3001/api/v1/foods

    console.log(req.session.token);

    let responseData = await instance.get("/profile/bmi-records/all",{
        headers: {
            Cookie: `token=${req.session.token}` 
        }
      }).then(response => {
        return response.data;
    }).catch((err) => {
        console.log({message: err});
        return err;
    });

    res.send(responseData);

    // res.sendFile(__path_views + '/statics/test.html');
});

module.exports = router;