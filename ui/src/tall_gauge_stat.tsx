import * as Fluent from '@fluentui/react'
import React from 'react'
import { stylesheet } from 'typestyle'
import { cards, Format } from './layout'
import { ProgressArc } from './parts/progress_arc'
import { bond, Card, F, Rec, S, unpack } from './qd'
import { clas, cssVar } from './theme'

const
  css = stylesheet({
    value_overlay: {
      position: 'absolute',
      top: 0, right: 0, bottom: 0, left: 0,
    },
    aux_value: {
      color: 'var(--text7)',
    },
  })

/** Create a tall stat card displaying a primary value, an auxiliary value and a progress gauge. */
interface State {
  /** The card's title. */
  title: S
  /** The primary value displayed. */
  value: S
  /** The auxiliary value displayed next to the primary value. */
  aux_value: S
  /** The value of the progress gauge, between 0 and 1. */
  progress: F
  /** The color of the progress gauge. */
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
          <Fluent.StackItem grow={1} styles={{ root: { position: 'relative', height: 'calc(100% - 17px)' } }}>
            <ProgressArc thickness={2} color={cssVar(s.plot_color)} value={s.progress} />
            <Fluent.Stack className={css.value_overlay} horizontalAlign='center' verticalAlign='center'>
              <Format data={data} format={s.value} className='s24 w3' />
              <Format data={data} format={s.aux_value} className={clas(css.aux_value, 's12')} />
            </Fluent.Stack>
          </Fluent.StackItem>
        </Fluent.Stack>
      )
    }
    return { render, changed }
  })

cards.register('tall_gauge_stat', View)