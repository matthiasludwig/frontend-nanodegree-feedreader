/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        it('have each a URL property defined it is NOT empty', function() {
            for (var i = 0, j = allFeeds.length; i < j; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url).not.toMatch(/ /); // This makes sure that the url property is not a long strong of spaces
                expect(allFeeds[i].url.length).not.toBe(0); // Checks if the url property is NOT totally empty
            }
        });

        it('have a name property and it is NOT empty', function() {
            for (var i = 0, j = allFeeds.length; i < j; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name.length).not.toBe(0); // Checks if the name property is NOT empty
            }
        });
    });

    describe('The menu', function(){
        var bodyElem;
        beforeEach(function() {
            bodyElem = $('body');
        });
        it('is hidden by default', function() {
            expect(bodyElem.attr('class')).toBe('menu-hidden');
        });
        it('changes visibility with each click', function() {
            var menuElem = $('.menu-icon-link');

            menuElem.click();
            expect(bodyElem.attr('class')).not.toBe('menu-hidden');
            menuElem.click();
            expect(bodyElem.attr('class')).toBe('menu-hidden');
        })
    });

    describe('Initial Entries', function() {
        beforeEach(function(done) {
            loadFeed(0, function(){
                done();
            });
        });

        it('have at least a single .entry element within the .feed container', function(done) {
            var feedElem = $('.feed').find('.entry').length;
            expect(feedElem).not.toBe(0);
            done();
        });
    });

    describe('New Feed Selection', function() {
        var firstCall;
        beforeEach(function(done) {
            loadFeed(0, function(){
                firstCall = $('.feed').find('.entry')[0].innerHTML;
            });
            loadFeed(1, function(){
                done();
            });
        });

        it('changes content of the page', function(done){
            var secondCall = $('.feed').find('.entry')[0].innerHTML;
            expect(firstCall).not.toBe(secondCall);
            done();
        });
    });
}());
