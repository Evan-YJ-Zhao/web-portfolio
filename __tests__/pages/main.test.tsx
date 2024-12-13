import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import HomePage from "@/app/page";
import HomeMenu from '@/components/home/HomeMenu';


jest.mock("@/components/home/HomeMenu", () => jest.fn(() => <div>MockedHomeMenu</div>));

describe('Main Page', () => {
  it('renders the HomeMenu', () => {
    render(<HomePage />);
    
    expect(HomeMenu).toHaveBeenCalled();
  })  
})