'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _whois = require('whois');

var _whois2 = _interopRequireDefault(_whois);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WHOIS_COMPONENT = 'com.robinmalfait.whois';

exports.default = function (robot) {
  var React = robot.dependencies.React;
  var Blank = robot.cards.Blank;

  var Whois = function (_React$Component) {
    _inherits(Whois, _React$Component);

    function Whois() {
      var _ref;

      _classCallCheck(this, Whois);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var _this = _possibleConstructorReturn(this, (_ref = Whois.__proto__ || Object.getPrototypeOf(Whois)).call.apply(_ref, [this].concat(args)));

      _this.state = {
        error: null,
        contents: null
      };
      return _this;
    }

    _createClass(Whois, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        var _this2 = this;

        _whois2.default.lookup(this.props.site, function (err, data) {
          _this2.setState({ error: err, contents: data });
        });
      }
    }, {
      key: 'render',
      value: function render() {
        var _state = this.state;
        var error = _state.error;
        var contents = _state.contents;
        var _props = this.props;
        var site = _props.site;

        var other = _objectWithoutProperties(_props, ['site']);

        return React.createElement(
          Blank,
          _extends({}, other, {
            title: 'Whois ' + site
          }),
          error && React.createElement(
            'pre',
            { style: { color: 'red' } },
            error
          ),
          React.createElement(
            'pre',
            null,
            contents
          )
        );
      }
    }]);

    return Whois;
  }(React.Component);

  robot.registerComponent(Whois, WHOIS_COMPONENT);

  robot.listen(/^whois (.*)$/, {
    description: "Get whois information",
    usage: 'whois <site>'
  }, function (_ref2) {
    var matches = _ref2.matches;

    robot.addCard(WHOIS_COMPONENT, { site: matches.site });
  });
};