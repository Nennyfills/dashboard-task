import { render, screen } from '@testing-library/react';
import Accordion from '..';

it('Should take a snapshot', () => {
  const { asFragment } = render(<Accordion children={[<div>Hello</div>]} titleData={[{ name: 'project 1', total: 576778 }]} />);
  expect(asFragment(<Accordion children={[<div>Project</div>]} titleData={[{ name: 'project1', total: 576778 }]} />)).toMatchSnapshot();
});

it('Should render a accordion with test id accordion-row', () => {
  render(<Accordion children={[<div>Hello</div>]} titleData={[{ name: 'project5', total: 576778 }]} />);
  const accordionClass = screen.getByTestId('accordion-row');
  expect(accordionClass).toBeTruthy();
  expect(accordionClass).toHaveClass('accordion-row');
});

it('Should render a navbar with test id accordion-row__col', () => {
  render(<Accordion children={[<div>Hello</div>]} titleData={[{ name: 'project2', total: 576778 }]} />);
  const accordionClass = screen.getByTestId('accordion-row__col');
  expect(screen.queryByTestId('accordion-row__col')).toBeTruthy();
  expect(accordionClass).toHaveClass('accordion-row__col');
});

it('Should render a navbar with test id accordion-row__tabs', () => {
  render(<Accordion children={[<div>Hello</div>]} titleData={[{ name: 'project3', total: 576778 }]} />);
  expect(screen.queryAllByTestId('accordion-row__tabs')).toBeTruthy();
  expect(screen.queryAllByTestId('accordion-row__tabs')).toHaveLength(2);
});

it('Should render a navbar with test id accordion-row__tab--label', () => {
  render(<Accordion children={[<div>Hello</div>]} titleData={[{ name: 'project4', total: 576778 }]} />);
  expect(screen.queryAllByTestId('accordion-row__tab--label')).toBeTruthy();
  expect(screen.queryAllByTestId('accordion-row__tab--label')).toHaveLength(1);
});

it('renders a message', () => {
  const { getByText } = render(<Accordion children={[<div>Hello</div>]} titleData={[{ name: 'project 1', total: 576778 }]} />);
  expect(getByText('Hello')).toBeInTheDocument();
  expect(getByText('project 1')).toBeInTheDocument();
  expect(getByText('576,778 USD')).toBeInTheDocument();
});
