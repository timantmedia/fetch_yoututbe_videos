const youtube = require('scrape-youtube');
// const { youtube } = require('scrape-youtube');

youtube.search('antmediaserver').then((results) => {
    // Unless you specify a custom type you will only receive 'video' results
    results.videos.map(r => {
        if(r.channel.name == "Ant Media Server"){
            console.log(r.title);
        }
    })
});