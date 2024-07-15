const domain = "https://www.gyrigym.com/";
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const Data = urlParams.get("Data");

function postData(RecordID, Token, GameID, GameLevel, Status) {
  const data = {
    RecordID,
    Token,
    GameID,
    GameLevel,
    Status,
  };

  const jsonData = JSON.stringify(data);
  const base64Data = btoa(jsonData);

  $.ajax({
    type: "GET",
    url: `${domain}TestApiPostGameData/${base64Data}`,
    async: false,
    beforeSend: function (jqXHR) {
      jqXHR.setRequestHeader("Authorization", "Bearer " + Data);
    },
    success: function (response) {
      console.log("Success: ", response);
      const jsonResponse = JSON.parse(response);
      console.log("RecordID: ", jsonResponse.RecordID);
      console.log("Token: ", jsonResponse.Token);
    },
    error: function (xhr) {
      console.error("Error: ", xhr);
    },
  });
}
