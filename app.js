const express = require('express');
const app = express();
const sassMiddleware = require('node-sass-middleware');
const path = require('path');
const data = {
  totalCount: 5,
  currentCount: 5,
  from: 0,
  to: 5,
  posts: [{
    title: 'Internship experience @ Wingify',
    dateOfPublish: '12th August, 2017',
    summary: 'I came to know about Wingify in January when Web Maker was featured on codepen blog. It was an awesome project and I found about Kushagra and went through his talks @ CSS conf, Asia (Ps I am a brilliant stalker). I went through Wingify’s products and saw their open source projects'
  }, {
    title: 'Using mertamorphic javascript in real world applications',
    dateOfPublish: '12th August, 2017',
    summary: 'I applied as a frontend engineering intern at Wingify. A week later I was contacted by the HR that I’ve been short listed and was provided with 5 problems on Interviewzen. After that I had a telephonic interview followed'
  }, {
    title: 'Internship experience @ Wingify',
    dateOfPublish: '12th August, 2017',
    summary: 'I came to know about Wingify in January when Web Maker was featured on codepen blog. It was an awesome project and I found about Kushagra and went through his talks @ CSS conf, Asia (Ps I am a brilliant stalker). I went through Wingify’s products and saw their open source projects'
  }, {
    title: 'Internship experience @ Wingify',
    dateOfPublish: '12th August, 2017',
    summary: 'I came to know about Wingify in January when Web Maker was featured on codepen blog. It was an awesome project and I found about Kushagra and went through his talks @ CSS conf, Asia (Ps I am a brilliant stalker). I went through Wingify’s products and saw their open source projects'
  }, {
    title: 'Using mertamorphic javascript in real world applications',
    dateOfPublish: '12th August, 2017',
    summary: 'I applied as a frontend engineering intern at Wingify. A week later I was contacted by the HR that I’ve been short listed and was provided with 5 problems on Interviewzen. After that I had a telephonic interview followed'
  }, {
    title: 'Internship experience @ Wingify',
    dateOfPublish: '12th August, 2017',
    summary: 'I came to know about Wingify in January when Web Maker was featured on codepen blog. It was an awesome project and I found about Kushagra and went through his talks @ CSS conf, Asia (Ps I am a brilliant stalker). I went through Wingify’s products and saw their open source projects'
  }]
};

app.use(
  sassMiddleware({
    src: path.join(__dirname, 'public'),
    dest: path.join(__dirname, 'public'),
    debug: true,
  })
);
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/views/index.html'));
});

app.get('/blog', function(req, res) {
  res.sendFile(path.join(__dirname + '/views/index.html'));
});

app.get('/api/posts', function(req, res) {
  var query = res.query;

  query.from = query.from || 0;
  query.to = query.to || data.totalCount;

  res.json(data);
});

app.get('*', function(req, res) {
  res.send('404');
});

app.listen(3000, function() {
  console.log('Example app listening   on port 3000!');
});