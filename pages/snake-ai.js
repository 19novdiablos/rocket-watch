import dynamic from 'next/dynamic'
const Game = dynamic(() => import('components/snake/GameAutoPlay'), {
  ssr: false
})

export default () => <Game />