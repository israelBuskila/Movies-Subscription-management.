const membersDAL = require("../DAL/membersDAL");
const axios = require("axios");

exports.initDB = async () => {
  let resp1 = await axios.get("https://jsonplaceholder.typicode.com/users");
  let membersApi = resp1.data;
  membersApi.forEach(async (x) => {
    let obj = {
      Name: x.name,
      Email: x.email,
      City: x.city,
    };
    return await membersDAL.addMember(obj);
  });
};
