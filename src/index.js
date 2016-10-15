import whois from 'whois'
const WHOIS_COMPONENT = 'com.robinmalfait.whois'

export default robot => {
  const { React } = robot.dependencies
  const { Blank } = robot.cards

  class Whois extends React.Component {
    constructor (...args) {
      super(...args)
      this.state = {
        error: null,
        contents: null
      }
    }

    componentWillMount () {
      whois.lookup(this.props.site, (err, data) => {
        this.setState({ error: err, contents: data })
      })
    }
    render () {
      const { error, contents } = this.state
      const { site, ...other } = this.props

      return (
        <Blank
          {...other}
          title={`Whois ${site}`}
        >
          {error && (<pre style={{color: 'red'}}>{error}</pre>)}
          <pre>{contents}</pre>
        </Blank>
      )
    }
  }

  robot.registerComponent(Whois, WHOIS_COMPONENT)

  robot.listen(/^whois (.*)$/, {
    description: "Get whois information",
    usage: 'whois <site>'
  }, ({ matches }) => {
    robot.addCard(WHOIS_COMPONENT, { site: matches.site })   
  })
}
