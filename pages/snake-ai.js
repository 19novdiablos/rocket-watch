import dynamic from 'next/dynamic'
const GameAutoPlay = dynamic(() => import('components/snake/GameAutoPlay'), {
  ssr: false
})

export default () => <GameAutoPlay />