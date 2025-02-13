var express = require('express');
var favicon = require('serve-favicon');
let fs = require('fs');

var app = express();

app.use(express.static('public'));
app.use(favicon(__dirname + '/public/favicon.ico'));


app.get('/', function (req, res) {
    res.sendFile('index.html', { root: `${__dirname}` });
});

app.get('/barcode', function (req, res) {
    res.sendFile('barcode.html', { root: `${__dirname}\\public` });
});

app.get('/main', function (req, res) {
    res.sendFile('FITSmain.html', { root: `${__dirname}\\public` });
});
app.get('/standby', function (req, res) {
    res.sendFile('standby.html', { root: `${__dirname}\\public` });
});
app.get('/findego', function (req, res) {
    res.sendFile('findego.html', { root: `${__dirname}\\public` });
});

// Default every route except the above to serve the 404.html
app.get('*', function (req, res) {
    res.sendFile('404.html', { root: `${__dirname}\\public` });
});

app.get('/face', function (req, res) {
    res.sendFile('face.html', { root: `${__dirname}\\public` });
});

app.get('/face2', function (req, res) {
    console.log("face2");
    try {
        console.log("Try");
        fs.unlinkSync("./something.jpg");
    } catch (e){
        console.log('catch'); //TODO: Make program not crash if something.jpg doesn't exist
        res.sendFile('face2.html', { root: `${__dirname}\\public` });
    }
    finally {
        console.log("finally");
        let oldPath = 'C:/Users/User/Downloads/screenshot.jpg'; //TODO: Make it so user doesn't have to be edited manually? Or doesn't matter for mirror in the end?
        let newPath = './public/labeled_images/something.jpg';

        fs.readFile(oldPath, function (err, data) {
            if (err) throw err;
            console.log('File read!');

            // Write the file
            fs.writeFile(newPath, data, function (err) {
                if (err) throw err;
                console.log('File written!');
            });

            // Delete the file
            fs.unlink(oldPath, function (err) {
                if (err) throw err;
                console.log('File deleted!');
            });
        });

        // fs.rename(oldPath, newPath, function (err) { //Werkt niet met C + D schijf, hierboven workaround. Dit is compacter though
        //     if (err) throw err;
        //     console.log('Successfully renamed - AKA moved!')
        // });
        setTimeout(() => res.sendFile('face2.html', { root: `${__dirname}\\public` }), 5000);

    }
});

app.listen(process.env.PORT || 3000, function () {
    console.log("Listening on port 3000!")
});
