
import { fireEvent, render, screen } from '@testing-library/react';
import Paginate from '../Paginate';
import { Piercing } from '../../types';
import { Provider } from 'react-redux';
import { RootState, setupStore } from '../../app/store';
import { PropsWithChildren } from 'react';

const emptyCb = () => {}

function createPiercing(p: Partial<Piercing> | ((p: Piercing) => Piercing) = {}): Piercing {
  const defaultPiercing: Piercing = {
    index: 0,
    site_cat: 'site_cat',
    type: 'mod',
    set_name: 'set_name',
    color: 'brown',
    name: 'name',
    pt_bone: 'bone',
    bone: 'bone',
    location: 'location',
    nodeid: 'nodeid',
    imgurl: 'imgurl',
    disabled: false,
    matcat: '',
    matid: '',
    modurl: '',
  }

  if (typeof p === 'function') {
    return p(defaultPiercing);
  }

  return { ...defaultPiercing, ...p }
}

function renderWithProvider(ui: React.ReactNode, partialState: Partial<RootState> = {}) {
  const store = setupStore(partialState)

  function Wrapper({ children }: PropsWithChildren<{}>) {
    return <Provider store={store}>{children}</Provider>
  }

  return { store, ...render(ui, { wrapper: Wrapper }) }
}

test('shows loading paragraph when pages is empty', async () => {
  renderWithProvider(<Paginate
    itemsPerPage={10}
    filteredPiercings={[]}
    currentPage={1}
    handlePageChange={emptyCb}
  />);

  expect(screen.getByText('Loading...')).toBeDefined();
})

test('shows loading paragraph when current page is less than 1', async () => {
  renderWithProvider(<Paginate
    itemsPerPage={10}
    filteredPiercings={[createPiercing()]}
    currentPage={-1}
    handlePageChange={emptyCb}
  />);

  expect(screen.getByText('Loading...')).toBeDefined();
})

test('shows loading paragraph when current page is greater than the level of pages', async () => {
  renderWithProvider(<Paginate
    itemsPerPage={10}
    filteredPiercings={[createPiercing()]}
    currentPage={2}
    handlePageChange={emptyCb}
  />);

  expect(screen.getByText('Loading...')).toBeDefined();
})

test('shows piercings', async () => {
  const piercings = Array.from(new Array(20)).map((_, idx) => createPiercing({
    index: idx,
    nodeid: `nodeid-${idx}`,
  }))

  renderWithProvider(<Paginate
    itemsPerPage={10}
    filteredPiercings={piercings}
    currentPage={1}
    handlePageChange={emptyCb}
  />);

  const buttons = await screen.findAllByRole("button")
  expect(buttons).toHaveLength(12) // Two addtional buttons

  // Assert pagination worked correctly
  expect(buttons[0].getAttribute("id")).toEqual("0")
  expect(buttons[9].getAttribute("id")).toEqual("9")

  const pagination = screen.getByTestId('pagination')
  const pageNumbers = pagination.querySelectorAll('li')
  expect(pageNumbers[0]?.classList.contains('current-page')).toBeTruthy()
  expect(pageNumbers[1]?.classList.contains('current-page')).toBeFalsy()
})

test.each([
  ["piercing_brow_a_l"],
  ["piercing_lobe_b_l"],
  ["piercing_tragus_a_l"],
  ["beard_upper_lip1_l"],
  ["piercing_brow_b_l"],
  ["lowerlip_08", "ghouls_customs"],
])('flips for entries: %s with a category of %s', async (bone: string, category?: string) => {
  const piercings = Array.from(new Array(20)).map((_, idx) => createPiercing({
    index: idx,
    nodeid: `nodeid-${idx}`,
    bone: idx === 0 ? bone : 'not-bone',
    ...(category ? { site_cat: category, bone } : {}),
  }))

  renderWithProvider(<Paginate
    itemsPerPage={10}
    filteredPiercings={piercings}
    currentPage={1}
    handlePageChange={emptyCb}
  />);

  const buttons = await screen.findAllByRole("button")
  // Assert the flipped logic worked with the lobe piercing
  expect(buttons[0].querySelector('img')?.classList.contains('flipped')).toBeTruthy()
})

test('calls callback when piercing is clicked', async () => {
  const piercings = Array.from(new Array(20)).map((_, idx) => createPiercing({
    index: idx,
    nodeid: `nodeid-${idx}`,
    bone: idx === 0 ? 'piercing_lobe_a_l' : 'not-bone',
  }))

  const spy = vi.fn()

  renderWithProvider(<Paginate
    itemsPerPage={10}
    filteredPiercings={piercings}
    currentPage={1}
    handlePageChange={emptyCb}
  />);

  let buttons = await screen.findAllByRole("button")
  expect(buttons).toHaveLength(12) // Two addtional buttons for pagination

  const paginationBtns = (await screen.findByTestId("pagination")).querySelectorAll('button')
  expect(paginationBtns).toHaveLength(2)

  expect(buttons[0].classList.contains('selected')).toBeFalsy()
  fireEvent.click(buttons[0])
  await screen.findAllByRole("button")

  expect(buttons[0].classList.contains('selected')).toBeTruthy()
})

test('calls pagination callback when clicked', async () => {
  const piercings = Array.from(new Array(20)).map((_, idx) => createPiercing({
    index: idx,
    nodeid: `nodeid-${idx}`,
    bone: idx === 0 ? 'piercing_lobe_a_l' : 'not-bone',
  }))

  const spy = vi.fn()

  renderWithProvider(<Paginate
    itemsPerPage={10}
    filteredPiercings={piercings}
    currentPage={1}
    handlePageChange={spy}
  />);

  const buttons = (await screen.findByTestId("pagination")).querySelectorAll('button')

  fireEvent.click(buttons[1])
  await screen.findAllByRole("button")

  expect(spy).toHaveBeenCalled()
})

test('adds one entry to pagination if the list bleeds over', async () => {
  const piercings = Array.from(new Array(22)).map((_, idx) => createPiercing({
    index: idx,
    nodeid: `nodeid-${idx}`,
    bone: idx === 0 ? 'piercing_lobe_a_l' : 'not-bone',
  }))

  renderWithProvider(<Paginate
    itemsPerPage={10}
    filteredPiercings={piercings}
    currentPage={1}
    handlePageChange={emptyCb}
  />);

  const buttons = (await screen.findByTestId("pagination")).querySelectorAll('button')
  expect(buttons).toHaveLength(3)
})