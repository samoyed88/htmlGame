const domain = "https://www.gyrigym.com/";
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const Data = urlParams.get("Data");
var exitGameUrl = "";
const csrf = "wgcspbTUf0Ug2xDYeyaABSsStppwOsmOK8oByPGG";

function postData(RecordID, Token, GameID, GameLevel, Status) {
  var data = {};
  data.RecordID = RecordID;
  data.Token = Token;
  data.GameID = GameID;
  data.GameLevel = GameLevel;
  data.Status = Status;
  data.UserData = Data;

  console.log(data);

  var jsonData = JSON.stringify(data);

  console.log(jsonData);

  var base64Data = btoa(jsonData);

  console.log(base64Data);

  $.ajax({
    type: "GET",
    url: domain + "ApiPostGameData/" + base64Data,
    async: false,
    beforeSend: function (jqXHR, settings) {
      jqXHR.setRequestHeader("Authorization", "Bearer " + Data);
    },
    success: function (data) {
      console.log("postdata  data: " + data);
      const json_data = JSON.parse(data);
      recid = json_data.RecordID;
      GameToken = json_data.Token;
    },
    error: function (xhr) {
      console.log("error");
    },
    complete: function () {
      //console.log("complete");
    },
  });
}

function postDataWithScore(RecordID, Token, GameID, Score, GameLevel, Status) {
  /* 前後測需要傳分數 */

  var data = {};
  data.RecordID = RecordID;
  data.Token = Token;
  data.GameID = GameID;
  data.Score = Score;
  data.GameLevel = GameLevel;
  data.Status = Status;
  data.UserData = Data;

  console.log(data);

  var jsonData = JSON.stringify(data);

  console.log(jsonData);

  var base64Data = btoa(jsonData);

  console.log(base64Data);

  $.ajax({
    type: "GET",
    url: domain + "ApiPostGameData/" + base64Data,
    async: false,
    beforeSend: function (jqXHR, settings) {},
    success: function (data) {
      console.log("postdata  data: " + data);
      const json_data = JSON.parse(data);
      recid = json_data.RecordID;
      GameToken = json_data.Token;
    },
    error: function (xhr) {
      console.log("error");
    },
    complete: function () {
      //console.log("complete");
    },
  });
}

function checkUserLogin() {
  //console.log(csrf);
  $.ajax({
    type: "POST",
    url: domain + "GameApi/GameCheckUserLogin",
    async: false,
    data: { Data: Data, csrf: csrf },
    beforeSend: function (jqXHR, settings) {
      jqXHR.setRequestHeader("Authorization", "Bearer " + Data);
    },
    success: function (data) {
      console.log(data);
    },
    error: function (xhr) {
      console.log("error");
      document.location.href = domain + "error_401";
    },
    complete: function () {},
  });
}

function checkUrl() {
  //console.log(csrf);
  $.ajax({
    type: "POST",
    url: domain + "GameApi/GameCheckUrl",
    async: false,
    data: { domain: domain, Url: window.location.href, Data: Data, csrf: csrf },
    beforeSend: function (jqXHR, settings) {
      jqXHR.setRequestHeader("Authorization", "Bearer " + Data);
    },
    success: function (data) {
      console.log(data);
    },
    error: function (xhr) {
      console.log("error");
      document.location.href = domain + "error_401";
    },
    complete: function () {},
  });
}

function IsAppEnterGame() {
  if (Data == null) {
    return false;
  } else {
    return true;
  }
}

function AppExitGame() {
  const message = "ExitGame";
  window.ReactNativeWebView.postMessage(message);
}

function getExternalUnitGameSettingByGameHash(GameID) {
  $.ajax({
    type: "POST",
    url: domain + "GameApi/getExternalUnitGameSettingByGameHash",
    async: false,
    data: { GameID: GameID },
    beforeSend: function (jqXHR, settings) {
      jqXHR.setRequestHeader("Authorization", "Bearer " + Data);
    },
    success: function (data) {
      console.log(data);
      gameSettingData = null;
      if (data.status == true) {
        gameSettingData = Object.entries(data)[1][1];
      }
    },
    error: function (xhr) {
      console.log("error");
      document.location.href = domain + "error_401";
    },
    complete: function () {},
  });
}

function getExternalUnitGameSettingImageBase64(gameSetting) {
  var imagePathArray = {};

  Object.entries(gameSetting).forEach((setting, index, array) => {
    if (
      setting[1].inputType == "File" &&
      setting[1].type == "image" &&
      setting[1].value != setting[1].original
    ) {
      imagePathArray[setting[1].inputName] = setting[1].value;
    }
  });

  $.ajax({
    type: "POST",
    url: domain + "GameApi/getExternalUnitGameSettingImageBase64",
    async: false,
    data: { imagePathArray: imagePathArray },
    beforeSend: function (jqXHR, settings) {
      jqXHR.setRequestHeader("Authorization", "Bearer " + Data);
    },
    success: function (data) {
      console.log(data);
      Object.entries(data).forEach((element, index, array) => {
        gameSetting[element[0]].base64 = element[1];
        console.log(gameSetting[element[0]]);
      });
    },
    error: function (xhr) {
      console.log("error");
      //document.location.href=domain+"error_401";
    },
    complete: function () {},
  });
}

function gameSettingNumberForEach(array, gameSettingNumber, operation) {
  newArray = array;

  newArray.forEach((element, index, array) => {
    switch (operation) {
      case "add":
        newArray[index] = element + parseFloat(gameSettingNumber);
        break;
      case "reduce":
        newArray[index] = element - parseFloat(gameSettingNumber);
        break;
      default:
        newArray[index] = newArray[index];
        break;
    }
  });

  return newArray;
}

function getexternalUnitExitGameUrl() {
  $.ajax({
    type: "POST",
    url: domain + "GameApi/getexternalUnitExitGameUrl",
    async: false,
    data: {},
    beforeSend: function (jqXHR, settings) {
      jqXHR.setRequestHeader("Authorization", "Bearer " + Data);
    },
    success: function (data) {
      exitGameUrl = data.url;
    },
    error: function (xhr) {
      console.log("error");
      //document.location.href=domain+"error_401";
    },
    complete: function () {},
  });
}
