
import { fireEvent, render, screen } from '@testing-library/react';
import Paginate from '../Paginate';
import { Piercing } from '../../types';

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
    selected: false,
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

test('shows loading paragraph when pages is empty', async () => {
  render(<Paginate
    itemsPerPage={10}
    filteredPiercings={[]}
    currentPage={1}
    handleBtns={() => {}}
    handlePageChange={() => {}}
  />);

  expect(screen.getByText('Loading...')).toBeDefined();
})

test('shows loading paragraph when current page is less than 1', async () => {
  render(<Paginate
    itemsPerPage={10}
    filteredPiercings={[createPiercing()]}
    currentPage={-1}
    handleBtns={() => {}}
    handlePageChange={() => {}}
  />);

  expect(screen.getByText('Loading...')).toBeDefined();
})

test('shows loading paragraph when current page is greater than the level of pages', async () => {
  render(<Paginate
    itemsPerPage={10}
    filteredPiercings={[createPiercing()]}
    currentPage={2}
    handleBtns={() => {}}
    handlePageChange={() => {}}
  />);

  expect(screen.getByText('Loading...')).toBeDefined();
})

test('shows piercings', async () => {
  const piercings = Array.from(new Array(20)).map((_, idx) => createPiercing({
    index: idx,
    nodeid: `nodeid-${idx}`,
    bone: idx === 0 ? 'piercing_lobe_a_l' : 'not-bone',
  }))

  render(<Paginate
    itemsPerPage={10}
    filteredPiercings={piercings}
    currentPage={1}
    handleBtns={() => {}}
    handlePageChange={() => {}}
  />);

  const buttons = await screen.findAllByRole("button")
  expect(buttons).toHaveLength(12) // Two addtional buttons

  // Assert the flipped logic worked with the lobe piercing
  expect(buttons[0].querySelector('img')?.classList.contains('flipped')).toBeTruthy()

  // Assert pagination worked correctly
  expect(buttons[0].getAttribute("id")).toEqual("0")
  expect(buttons[9].getAttribute("id")).toEqual("9")

  const pagination = screen.getByTestId('pagination')
  const pageNumbers = pagination.querySelectorAll('li')
  expect(pageNumbers[0]?.classList.contains('current-page')).toBeTruthy()
  expect(pageNumbers[1]?.classList.contains('current-page')).toBeFalsy()
})

test('calls callback when piercing is clicked', async () => {
  const piercings = Array.from(new Array(20)).map((_, idx) => createPiercing({
    index: idx,
    nodeid: `nodeid-${idx}`,
    bone: idx === 0 ? 'piercing_lobe_a_l' : 'not-bone',
  }))

  const spy = vi.fn()

  render(<Paginate
    itemsPerPage={10}
    filteredPiercings={piercings}
    currentPage={1}
    handleBtns={spy}
    handlePageChange={() => {}}
  />);

  const buttons = await screen.findAllByRole("button")
  expect(buttons).toHaveLength(12) // Two addtional buttons

  fireEvent.click(buttons[0])
  await screen.findAllByRole("button")

  expect(spy).toHaveBeenCalledWith(piercings[0].nodeid, piercings[0].bone)
})

test('calls pagination callback when clicked', async () => {
  const piercings = Array.from(new Array(20)).map((_, idx) => createPiercing({
    index: idx,
    nodeid: `nodeid-${idx}`,
    bone: idx === 0 ? 'piercing_lobe_a_l' : 'not-bone',
  }))

  const spy = vi.fn()

  render(<Paginate
    itemsPerPage={10}
    filteredPiercings={piercings}
    currentPage={1}
    handleBtns={() => {}}
    handlePageChange={spy}
  />);

  const buttons = (await screen.findByTestId("pagination")).querySelectorAll('button')

  fireEvent.click(buttons[1])
  await screen.findAllByRole("button")

  expect(spy).toHaveBeenCalled()
})