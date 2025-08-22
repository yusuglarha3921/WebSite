// Active nav link highlight on scroll
(function () {
  var links = Array.prototype.slice.call(document.querySelectorAll('.nav-links a'));
  if (!links.length) return;

  var sectionIds = links.map(function (a) { return a.getAttribute('href'); })
    .filter(function (h) { return h && h.startsWith('#'); })
    .map(function (h) { return h.substring(1); });

  var sections = sectionIds.map(function (id) { return document.getElementById(id); })
    .filter(function (el) { return !!el; });

  function onScroll() {
    var scrollPos = window.scrollY || window.pageYOffset;
    var currentId = null;
    for (var i = 0; i < sections.length; i++) {
      var sec = sections[i];
      var offsetTop = sec.getBoundingClientRect().top + scrollPos - 120; // account sticky nav
      if (scrollPos >= offsetTop) currentId = sec.id;
    }
    links.forEach(function (a) {
      var href = a.getAttribute('href');
      if (href && currentId && href.indexOf('#' + currentId) !== -1) {
        a.classList.add('active');
      } else {
        a.classList.remove('active');
      }
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('load', function(){
    var y = new Date().getFullYear();
    var el = document.getElementById('year');
    if (el) el.textContent = y;
    onScroll();
    if (location.hash) {
      // ensure active state reflects hash on load
      setTimeout(onScroll, 50);
    }
  });
  onScroll();
})();


