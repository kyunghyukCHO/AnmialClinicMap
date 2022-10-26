let express = require("express");
let axios = require("axios");
let app = express();
let port = process.env.PORT || 3000;
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";    //certificate을 받기 위해서 

app.use(express.static("public_html"));
app.listen(port, () => {
  console.log("서버 연결");
});
 
app.get("/Veterinary_list", (req, res) => {
  let api = async () => {
      let response = null;
      try {            
          response = await axios.get("https://apis.data.go.kr/3510500/veterinary_hospital/getList", {
              params: {
                  "serviceKey": "G6OeK7VKRFu/MQnt08c64VnMlDCuTAOiFpJXw/5/46LhQoJRYuN6PAc0u1IR5XO0Nw0rehJTfvX3e406ncP8Jw==",
                  "pageNo": req.query.pageNo,
                  "numOfRows": req.query.numOfRows,
                  "type": req.query.type               
              }
          })
      }
      catch(e) {
          console.log(e);
      } 
      return response;            
  }
  api().then((response) => {
      res.setHeader("Access-Control-Allow-Origin", "*"); 
      res.json(response.data.response.body);
  });
  
});


app.get("/Pharmacy_list", (req, res) => {
    let api = async () => {
        let response = null;
        try {            
            response = await axios.get("http://apis.data.go.kr/3510500/animal_pharmacy/getList", {
                params: {
                    "serviceKey": "G6OeK7VKRFu/MQnt08c64VnMlDCuTAOiFpJXw/5/46LhQoJRYuN6PAc0u1IR5XO0Nw0rehJTfvX3e406ncP8Jw==",
                    "pageNo": req.query.pageNo,
                    "numOfRows": req.query.numOfRows,
                    "type": req.query.type               
                }
            })
        }
        catch(e) {
            console.log(e);
        } 
        return response;            
    }
    api().then((response) => {
        res.setHeader("Access-Control-Allow-Origin", "*"); 
        res.json(response.data.response.body);
    });
    
  });
