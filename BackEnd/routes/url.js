const express = require('express');
const router = express.Router();
const validUrl = require('valid-url')
const shortid = require('shortid')
const config = require('config')
const Url = require('../modules/Url');


//@route  POST request /api/url/shorten
//@desc   Create short URL

router.post('/shorten', async (req, res) => {// address and callback function
    const { longUrl } = req.body;//sent from the client (frontEnd)
    const baseUrl = config.get('baseURl');
    //check base url
    if (!validUrl.isUri(baseUrl)) {
        return res.status(401).json('Invalid base url');
    }

    //Check long url
    if (validUrl.isUri(longUrl)) {
        try {

            //Create url code
            var urlCode = shortid.generate();
            let urlCodeCheck = await Url.findOne({ urlCode });// if we already used that code
            while (urlCodeCheck) {
                urlCode = shortid.generate();//regenerate until we get a new code
                urlCodeCheck = await Url.findOne({ urlCode });
            }


            let url = await Url.findOne({ longUrl });// if the url is in the database
            if (url) {
                res.json({
                    longUrl: url.longUrl,
                    shortUrl: url.shortUrl
                });
            } else {
                const shortUrl = baseUrl + '/' + urlCode;
                url = new Url({
                    longUrl,
                    shortUrl,
                    urlCode,
                    date: new Date()
                });

                await url.save();// saving the url to database
                res.json({
                    longUrl: url.longUrl,
                    urlCode,
                    shortUrl: url.shortUrl
                });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json("Server Error");

        }
    } else {
        res.status(401).json('Invalid url');

    }
});

module.exports = router;