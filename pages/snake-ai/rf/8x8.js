import dynamic from 'next/dynamic'
const Game8x8 = dynamic(() => import('components/snake/rf/Game8x8'), {
  ssr: false
})

export default class SnakeAI8x8 extends React.Component {
  static async getInitialProps({ query }) {
    console.log({ query })
    return {
      h: query.h || 'm'
    }
  }
  render() {
    return <Game8x8 h={this.props.h}/>
  }
}