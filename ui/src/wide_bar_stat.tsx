import * as Fluent from '@fluentui/react'
import React from 'react'
import { stylesheet } from 'typestyle'
import { cards, Format } from './layout'
import { ProgressBar } from './parts/progress_bar'
import { bond, Card, F, Rec, S, unpack } from './qd'
import { clas, cssVar } from './theme'

const
  css = stylesheet({
    aux_value: {
      color: cssVar('text7'),
    }
  })

/** Create a wide stat card displaying a primary value, an auxiliary value and a progress bar. */
interface State {
  /** The card's title. */
  title: S
  /** The primary value displayed. */
  value: S
  /** The auxiliary value displayed next to the primary value. */
  aux_value: S
  /** The value of the progress bar, between 0 and 1. */
  progress: F
  /** The color of the progress bar. */
  plot_color?: S
  /** Data for this card. */
  data?: Rec
}

export const
  View = bond(({ name, state: s, changed }: Card<State>) => {
    const render = () => {
      const data = unpack(s.data)
      return (
        <Fluent.Stack data-test={name} style={{ position: 'static', padding: 15, height: '100%' }}>
          <Format data={data} format={s.title} className='s12 w6' />
          <Fluent.StackItem grow={1}>
            <Fluent.Stack horizontal verticalAlign='baseline' tokens={{ childrenGap: 5 }}>
              <Format data={data} format={s.value} className='s18 w3' />
              <Format data={data} format={s.aux_value} className={clas(css.aux_value, 's13')} />
            </Fluent.Stack>
            <ProgressBar thickness={2} color={cssVar(s.plot_color)} value={s.progress} />
          </Fluent.StackItem>
        </Fluent.Stack>
      )
    }
    return { render, changed }
  })

cards.register('wide_bar_stat', View)