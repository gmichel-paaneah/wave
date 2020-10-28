import React from 'react'
import { stylesheet } from 'typestyle'
import { cards, Repeat } from './layout'
import { bond, Card, Rec, S, Data } from './qd'

const
  css = stylesheet({
    card: {
      display: 'flex',
      flexDirection: 'column',
    },
    body: {
      flexGrow: 1,
      overflow: 'auto',
      $nest: {
        '>*': {
          borderBottom: '1px solid var(--text1)',
          padding: '5px 0',
        },
      },
    }
  })

/**
 * EXPERIMENTAL. DO NOT USE.
 * Create a card containing other cards laid out in the form of a list (vertically, top-to-bottom).
 **/
interface State {
  /** The title for this card. */
  title: S
  /** The child card type. */
  item_view: S
  /** The child card properties. */
  item_props: Rec
  /** Data for this card. */
  data: Data
}

export const
  View = bond(({ name, state: s, changed }: Card<State>) => {
    const
      render = () => {
        return (
          <div data-test={name} className={css.card}>
            <div className='s12 w6'>{s.title}</div>
            <div className={css.body}>
              <Repeat view={s.item_view} props={s.item_props} data={s.data} />
            </div>
          </div>
        )
      }
    return { render, changed }
  })

cards.register('list', View)