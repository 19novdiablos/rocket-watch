import dynamic from 'next/dynamic'
const GameAutoPlay = dynamic(() => import('components/snake/GameAutoPlay'), {
  ssr: false
})

export default class SnakeAI extends React.Component {
  static async getInitialProps({ query }) {
    console.log({ query })
    return {
      h: query.h || 'm'
    }
  }
  render() {
    return <GameAutoPlay h={this.props.h}/>
  }
}