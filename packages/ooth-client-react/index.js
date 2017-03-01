const React = require('react')
const {getContext} = require('recompose')

class OothProvider extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: null
        }
        props.client.user().subscribe(user => {
            this.setState({
                user
            })
        })
    }
    render() {
        return React.Children.only(this.props.children)
    }
    getChildContext() {
        const {client: oothClient} = this.props
        const {user} = this.state
        return {
            oothClient,
            user
        }
    }
}
OothProvider.childContextTypes = {
    oothClient: React.PropTypes.object.isRequired,
    user: React.PropTypes.object
}

const withOoth = getContext({
    oothClient: React.PropTypes.object.isRequired
})

const withUser = getContext({
    user: React.PropTypes.object
})

module.exports = {
    OothProvider,
    withOoth,
    withUser
}