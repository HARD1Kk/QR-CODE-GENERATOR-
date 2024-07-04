import inquirer from 'inquirer';
import qr from 'qr-image';
import fs from "fs";

inquirer
  .prompt([
    {
      type: 'input',
      name: 'URL',
      message: 'Please enter your link to generate a QR code :'
    },
  ])

  .then(answers => {
    const url = answers.URL;



    var myQr = qr.image(url, { type: 'png' });

    myQr.pipe(fs.createWriteStream('qr_img.png'));

    fs.writeFile("URL.txt", url, (err) => {
      if (err)
        console.log(err);
      else {
        console.log("File written successfully\n");
        console.log("The written has the following contents:");
        console.log(fs.readFileSync("URL.txt", "utf8"));
      
      }
    });

  })
  .catch((error) => {
    console.error("An error occurred:", error); // Handle errors
  });