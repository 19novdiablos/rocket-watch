import dynamic from 'next/dynamic'
const Game = dynamic(() => import('components/snake/Game'), {
  ssr: false
})

export default () => <Game />