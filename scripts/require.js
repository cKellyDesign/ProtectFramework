require([
	'./views/testRoot'], function (TestRoot) {
	Protect = window.Protect || {};
	
	Protect.testRoot = new TestRoot({ el: $('#j-main') });
});