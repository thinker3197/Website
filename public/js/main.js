(function () {
  var root = 'http://localhost:3000';
  // var router = new Navigo(root);

  function activateRouter() {
    var $homeView = document.getElementById('js-home-view');
    var $blogView = document.getElementById('js-blog-view');
    var $blogNav = document.getElementById('js-blog-nav');

    page('/', function () {
      $blogView.classList.add('hidden');
      $blogNav.classList.remove('active');
      $homeView.classList.remove('hidden');
    });
    page('/blog', function () {
      $blogView.classList.remove('hidden');
      $blogNav.classList.add('active');
      $homeView.classList.add('hidden');

      populateBlog();
    });

    page();
  }

  function activateNavbar() {
    var $internalNav = document.getElementById('js-internal-nav');

    $internalNav.addEventListener('click', function onInternalNavClick(e) {
      if (e.target.nodeName === 'A' || e.target.nodeName === 'LI') {
        var route = '/' + e.target.innerText.toLowerCase();

        page(route);
      }
    });
  }

  function addGreetingListener() {
    var $greetingButton = document.getElementById('js-greeting-btn');

    $greetingButton.addEventListener('mouseover', function onGreetingBtnMouseover(e) {
      this.innerHTML = '🙏🏻';
    });

    $greetingButton.addEventListener('mouseleave', function onGreetingBtnMouseover(e) {
      this.innerHTML = 'Namaste';
    });
  }

  function tt() {
    var $tt = document.getElementById('js-tt');
    var $target = document.getElementsByClassName('tt--target');

    for (var i = 0; i < $target.length; ++i) {
      $target[i].addEventListener('mouseover', function (e) {
        $tt.style.top = (e.target.offsetTop - 80) + 'px';
        $tt.style.left = (e.target.offsetLeft + 45) + 'px';
        $tt.lastElementChild.innerHTML = e.target.dataset.ttText;
        $tt.classList.remove('hidden');
      });

      $target[i].addEventListener('mouseleave', function (e) {
        $tt.classList.add('hidden');
      });
    }
  }

  function getBlogMetadata() {
    return new Promise(function (resolve, reject) {
      const url = '/api/posts?from=0&to=5';
      const xhr = new XMLHttpRequest();

      xhr.open('GET', url);
      xhr.onload = function () {
        if (this.status >= 200 && this.status < 300) {
          resolve(xhr.response);
        } else {
          reject();
        }
      };
      xhr.onerror = function () {
        reject();
      };
      xhr.send();
    });
  }

  function populateBlog() {
    getBlogMetadata().then(function (response) {
      var blogs = JSON.parse(response).posts;
      var markup = '',
        $blogList = document.getElementById('js-blog-list');

      for (var i = 0; i < blogs.length; ++i) {
        markup += '<li class="list-item">' +
          '<div class="list-content">' +
          '<h3 class="list-head">' + blogs[i].title + '</h3>' +
          '<p class="list-date">' + blogs[i].dateOfPublish + '</p>' +
          '<p class="list-desc">' + blogs[i].summary + ' <span class="list-link">...</span></p>' +
          '</div>' +
          '</li>';
      }

      $blogList.innerHTML = markup;
    }, function () {
      console.error('Whoops! An error occured');
    });
  }

  function init() {
    document.addEventListener("DOMContentLoaded", function (event) {
      activateRouter();
      activateNavbar();
      addGreetingListener();
      tt();
    });
  }

  init();
})();