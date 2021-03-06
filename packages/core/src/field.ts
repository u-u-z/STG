import { use, Plugin } from './plugin'
import Looping, { LoopingOptions } from './looping'
import Barrage, { BarrageOptions } from './barrage'
import Player, { PlayerOptions, ControlMode } from './player'

export interface TextStyle {
  fontSize?: number
  fontColor?: string
  fontFamily?: string
}

export interface TextOptions extends TextStyle {
  x?: number
  y?: number
  textAlign?: CanvasTextAlign
  textBaseline?: CanvasTextBaseline
}

interface SpinnerStyle {
  size?: string
}

export interface FieldOptions extends LoopingOptions {
  control?: ControlMode
  titleStyle?: TextOptions
  background?: string
  height?: number
  width?: number
  spinner?: SpinnerStyle
}

export default class Field extends Looping {
  public readonly context: CanvasRenderingContext2D
  public readonly canvas: HTMLCanvasElement
  public readonly loadingDiv: HTMLDivElement
  public readonly yinyangOrb: HTMLDivElement

  public control?: ControlMode
  public barrage: Barrage
  public player: Player
  public title: string
  
  private titleStyle: TextOptions

  public onMouseMove?(this: this, event: MouseEvent): void
  public onMouseDown?(this: this, event: MouseEvent): void
  public onMouseUp?(this: this, event: MouseEvent): void
  public onClick?(this: this, event: MouseEvent): void

  constructor(public readonly element: HTMLElement, options: FieldOptions = {}) {
    super(options)
    element.classList.add('stg-field')
    element.style.background = options.background
    this.canvas = element.appendChild(document.createElement('canvas'))
    this.canvas.height = options.height || 560
    this.canvas.width = options.width || 480
    this.context = this.canvas.getContext('2d')
    this.control = options.control
    this.setTitleStyle(options.titleStyle)

    this.loadingDiv = element.appendChild(document.createElement('div'))
    this.yinyangOrb = this.loadingDiv.appendChild(document.createElement('div'))
    this.loadingDiv.appendChild(document.createTextNode('少女祈祷中'))
    this.loadingDiv.classList.add('loading')
    this.yinyangOrb.classList.add('yinyang-orb')
    const { size = '20px' } = options.spinner || {}
    this.loadingDiv.style.fontSize = size

    if (this.control === undefined) this.control = 'keyboard'
    if (this.control) this.element.classList.add('use-' + this.control)
    
    element.addEventListener('mousemove', e => this.onMouseMove && this.onMouseMove(e))
    element.addEventListener('mousedown', e => this.onMouseDown && this.onMouseDown(e))
    element.addEventListener('mouseup', e => this.onMouseUp && this.onMouseUp(e))
    element.addEventListener('click', e => this.onClick && this.onClick(e))
    
    addEventListener('keydown', event => {
      if (event.key !== 'Escape') return
      this.toggle()
      event.preventDefault()
      event.stopPropagation()
    })

    this.onClick = event => {
      if (!this.barrage) return
      this.toggle()
      event.preventDefault()
      event.stopPropagation()
    }
  }

  async use<T>(plugin: Plugin<T>, options?: T, once = true) {
    await this.setSpinner(use(plugin, options, once))
  }

  async setSpinner(promise: Promise<any>) {
    this.element.classList.add('is-loading')
    const result = await promise
    this.element.classList.remove('is-loading')
    return result
  }

  setTitleStyle(options: TextStyle = {}) {
    const fontSize = options.fontSize || 24
    this.titleStyle = {
      fontSize,
      fontColor: 'white',
      x: this.canvas.width - fontSize,
      y: fontSize,
      textAlign: 'right',
      textBaseline: 'top',
      fontFamily: 'Calibri, Candara, Segoe, "Segoe UI", Optima, Arial',
      ...options,
    }
  }

  async setPlayer(options: PlayerOptions) {
    if (!options) return
    this.removePlayer()
    if (typeof options.before === 'function') {
      await this.setSpinner(use(options.before))
    }
    this.player = new Player({
      control: this.control,
      ...options,
    }).mount(this.context, this, this.barrage)
    if (this.barrage) this.barrage.$refs.player = this.player
  }

  removePlayer() {
    if (this.player) {
      this.player.destory()
      this.player = null
    }
    if (this.barrage) delete this.barrage.$refs.player
  }

  async setBarrage(options: BarrageOptions) {
    if (!options) return
    this.pause()
    this.clearScreen()
    if (typeof options.before === 'function') {
      await this.setSpinner(use(options.before))
    }
    this.barrage = new Barrage(options)
    if (this.player) this.barrage.$refs.player = this.player
    this.barrage.mount(this.context, this)
  }

  clearScreen() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }

  clear() {
    this.pause()
    this.removePlayer()
    this.clearScreen()
    this.barrage = null
  }

  update() {
    if (this.barrage) this.barrage.update()
    if (this.player) this.player.update()
  }

  render() {
    this.clearScreen()
    if (this.player) this.player.renderBelow()
    if (this.barrage) this.barrage.render()
    if (this.player) this.player.renderAbove()
    this.showTitle()
  }

  showText(text: string, options: TextOptions) {
    this.context.textAlign = options.textAlign
    this.context.textBaseline = options.textBaseline
    this.context.fillStyle = options.fontColor
    this.context.font = `${options.fontSize || 16}px ${options.fontFamily}`
    this.context.fillText(text, options.x, options.y)
  }

  private showTitle() {
    const option = this.title && this.titleStyle
    if (!option) return
    this.showText(this.title, option)
  }
}
