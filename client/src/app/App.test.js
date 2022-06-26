import App from './App';
import { render,fireEvent, screen, waitFor, findAllByText, findAllByTestId } from '@testing-library/react';
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import userEvent from '@testing-library/user-event'
import { wait, within } from '@testing-library/user-event/dist/utils';
import { act } from 'react-dom/test-utils';
import { async } from '@firebase/util';
import { Button } from '@mui/material';

test('login', async() => { //DONE
  const { getByText, getByRole, findAllByText, findByText, container } = render(<App/>);
  const element = await waitFor(() => findByText(/landing.sign_in/i));
  const leftClick = { button: 0 }
  userEvent.click(element, leftClick);
  await waitFor(() => findByText(/login_page.signin_to/i))

  const email = container.querySelector('input[name="email"]')
  const password = container.querySelector('input[name="password"]')
  await waitFor(() => {
    fireEvent.change(email, {
      target: {
        value: "mahasineldervis1@gmail.com"
      }
    })
  })
  await waitFor(() => {
    fireEvent.change(password, {
      target: {
        value: "testtest1234"
      }
    })
  })

  const login = await waitFor(() => findByText(/login.login_button/i));
  await waitFor(() => {userEvent.click(login, leftClick)});
  await wait();
  await waitFor(() => findByText(/search_page.theses/i))
}) 
/*
test('Register', async () => {
  const { getByText, getByRole, findAllByText, findByText, container, findByRole, findByAltText, getByTestId } = render(<App />)

  ///logout after you logged in above!   
  //const profileIcon = getByTestId('profile-icon')
  //const leftClick = { button: 0 }
  //userEvent.click(profileIcon, leftClick);
  //const signOutButton = await waitFor(() => findByText(/Sign Out/i))
  //userEvent.click(signOutButton, leftClick);
  ////
  const element = await waitFor(() => findByText(/Sign Up Now!/i));
  
  const leftClick = { button: 0 }
  userEvent.click(element, leftClick);
  const element2 = await waitFor(() => findByText(/Create a new account to access unlimited theses!/i));
  expect(element2).toBeInTheDocument();

  const firstname = container.querySelector('input[name="firstname"]')
  await waitFor(() => {
    fireEvent.change(firstname, {
      target: {
        value: "testfirstname" 
      }
    })
  })  
  
  
  
  const lastname = container.querySelector('input[name="lastname"]')
  await waitFor(() => {
    fireEvent.change(lastname, {
      target: {
        value: "testlastname"
      }
    })
  })
  const email = container.querySelector('input[name="email"]')
  await waitFor(() => {
    fireEvent.change(email, {
      target: {
        value: "testemail3@test.com"  //change the number every time you run npm test (+1)
      }
    })
  })

  const password = container.querySelector('input[name="password"]')
  await waitFor(() => {
    fireEvent.change(password, {
      target: {
        value: "testpassword"
      }
    })
  })
  const autocomplete = getByTestId('autocomplete-status');
  const input = autocomplete.querySelector('input')
  autocomplete.focus()
  fireEvent.change(input, { target: { value: 'Doctoral Student' } })
  await wait()
  fireEvent.keyDown(autocomplete, { key: 'ArrowDown' })
  await wait()
  fireEvent.keyDown(autocomplete, { key: 'Enter' })
  await wait()
  expect(input.value).toEqual('Undergraduate Student')

  const autocomplete2 = getByTestId('autocomplete-uni'); 
  const input2 = autocomplete2.querySelector('input')
  autocomplete2.focus()
  fireEvent.change(input2, { target: { value: 'ABDULLAH GÜL ÜNİVERSİTESİ' } })
  await wait()
  fireEvent.keyDown(autocomplete2, { key: 'ArrowDown' })
  await wait()
  fireEvent.keyDown(autocomplete2, { key: 'Enter' })
  await wait()
  expect(input2.value).toEqual('ABDULLAH GÜL ÜNİVERSİTESİ')

  const radio = screen.getByLabelText('Female')
  //fireEvent.change(radio, { target: { value: "Male" } });
  userEvent.click(getByText('Male'), leftClick);
  expect(radio.value).toBe('female')

  const checkbox = getByText('I agree to the Terms of Service and Privacy Policy, including Cookie Use.')
  //fireEvent.click(checkbox)
  userEvent.click(checkbox, leftClick);
  await wait();

  const button = getByTestId('register-button');
  userEvent.click(button, leftClick);
  
  await wait();

  //const homeElement = await screen.findByText('Search By Tags:') ;
  //expect(homeElement).toBeInTheDocument();

}); */



test('edit profile', async () => {
  const { getByText, getByRole, findByTestId, findByText, container, findByRole, findByAltText, getByTestId, findByTitle } = render(<App />)
  const leftClick = { button: 0 }
  const LogoButton = await waitFor(() => findByTestId('tithenaiLogo'));
  userEvent.click(LogoButton, leftClick);
 /* const element = await waitFor(() => findByText(/landing.sign_in/i));
  userEvent.click(element, leftClick);
  await waitFor(() => findByText(/login_page.signin_to/i))
  const email = container.querySelector('input[name="email"]')
  const password = container.querySelector('input[name="password"]')
  await waitFor(() => {
    fireEvent.change(email, {
      target: {
        value: "mahasineldervis1@gmail.com"
      }
    })
  })
  await waitFor(() => {
    fireEvent.change(password, {
      target: {
        value: "testtest1234"
      }
    })
  })

  const login = await waitFor(() => findByText(/login.login_button/i));
  await waitFor(() => {userEvent.click(login, leftClick)});*/
  await wait();
  const profileIcon = await waitFor(() => findByTestId('profile-icon')); //Not finding profile icon
  //const leftClick = { button: 0 }
  userEvent.click(profileIcon, leftClick);
  const profileButton = await waitFor(() => findByText('navbar.profile'))
  userEvent.click(profileButton, leftClick);
  await waitFor(() => findByText(/my_profile.update_pass/i));
  //const editIcon = getByTestId('profileInfoUpdate');
  const editIcon = await waitFor(() => findByTestId('profileInfoUpdate'));
  erEvent.click(editIcon, leftClick);
  const firstName = container.querySelector('input[name="firstname"]')
  await waitFor(() => {
    fireEvent.change(firstName, {
      target: {
        value: "MahoReiss"
      }
    })
  })
  const save = await waitFor(() => findByText(/edit_profile.save/i));
  await waitFor(() => {userEvent.click(save, leftClick)});
  const checkChanged = await waitFor(() => {findByText(/MahoReiss Elderviş/i)}) //هاد الكود كان يشتغل بس صاير بطيء كتير وقت بدو يطالع معلومات المستخدم عالشاشة لهيك ماعم يلاقيهن بالتيستينغ
}) 


test('logout', async() => {
  const { getByText, getByRole, findAllByText, findByText, container, findByRole, findByAltText, getByTestId } = render(<App />)
  const leftClick = { button: 0 }

  const LogoButton = await waitFor(() => findByTestId('tithenaiLogo'));
  userEvent.click(LogoButton, leftClick);
 /* const element1 = await waitFor(() => findByText(/landing.sign_in/i));
  const leftClick1 = { button: 0 }
  userEvent.click(element1, leftClick1);
  await waitFor(() => findByText(/login_page.signin_to/i))

  const email = container.querySelector('input[name="email"]')
  const password = container.querySelector('input[name="password"]')
  await waitFor(() => {
    fireEvent.change(email, {
      target: {
        value: "mahasineldervis1@gmail.com"
      }
    })
  })
  await waitFor(() => {
    fireEvent.change(password, {
      target: {
        value: "testtest1234"
      }
    })
  })

  const login = await waitFor(() => findByText(/login.login_button/i));
  await waitFor(() => {userEvent.click(login, leftClick1)});*/
  await wait();
  const profileIcon = getByTestId('profile-icon')
  userEvent.click(profileIcon, leftClick);
  const signOutButton = await waitFor(() => findByText(/navbar.signout/i))
  await waitFor(() => {userEvent.click(signOutButton, leftClick)});
  await wait();
  const element = await waitFor(() => findByText(/login_page.signin_to/i));
  expect(element).toBeInTheDocument();
})

test('saved list page', async () => {
  const { getByText, getByRole, findByTestId, findByText, container, findByRole, findByAltText, getByTestId, findByTitle } = render(<App />)
  const leftClick = { button: 0 }
  const LogoButton = await waitFor(() => findByTestId('tithenaiLogo'));
  userEvent.click(LogoButton, leftClick);
 /* const element = await waitFor(() => findByText(/landing.sign_in/i));
  const leftClick = { button: 0 }
  userEvent.click(element, leftClick);
  await waitFor(() => findByText(/login_page.signin_to/i))

  const email = container.querySelector('input[name="email"]')
  const password = container.querySelector('input[name="password"]')
  await waitFor(() => {
    fireEvent.change(email, {
      target: {
        value: "mahasineldervis1@gmail.com"
      }
    })
  })
  await waitFor(() => {
    fireEvent.change(password, {
      target: {
        value: "testtest1234"
      }
    })
  })

  const login = await waitFor(() => findByText(/login.login_button/i));
  await waitFor(() => {userEvent.click(login, leftClick)});  */
  //const leftClick = { button: 0 }

  await wait();

  const profileIcon = getByTestId('profile-icon'); //Not finding profile icon
  //const leftClick = { button: 0 }
  userEvent.click(profileIcon, leftClick);
  const profileButton = await waitFor(() => findByText('navbar.saved_list'))
  userEvent.click(profileButton, leftClick);
  await wait();
  await waitFor(() => findByText(/saved.you_didnt/i));
}) 
/*
test('saved list page results found', async () => {
  const { getByText, getByRole, findByTestId, findByText, container, findByRole, findByAltText, getByTestId, findByTitle } = render(<App />)

  const element = await waitFor(() => findByText(/landing.sign_in/i));
  const leftClick = { button: 0 }
  userEvent.click(element, leftClick);
  await waitFor(() => findByText(/login_page.signin_to/i))

  const email = container.querySelector('input[name="email"]')
  const password = container.querySelector('input[name="password"]')
  await waitFor(() => {
    fireEvent.change(email, {
      target: {
        value: "mahasineldervis1@gmail.com"
      }
    })
  })
  await waitFor(() => {
    fireEvent.change(password, {
      target: {
        value: "testtest1234"
      }
    })
  })

  const login = await waitFor(() => findByText(/login.login_button/i));
  await waitFor(() => {userEvent.click(login, leftClick)});

  const profileIcon = getByTestId('profile-icon'); //Not finding profile icon
  //const leftClick = { button: 0 }
  userEvent.click(profileIcon, leftClick);
  const profileButton = await waitFor(() => findByText('navbar.saved_list'))
  userEvent.click(profileButton, leftClick);
  await waitFor(() => findByText(/Saved theses found:/i));
}) */

test('View thesis page renders', async()=>{ //DONE
  const { getByText, getByRole, findAllByText, findByText, container, getByTestId, findByTestId } = render(<App/>);
  const leftClick = { button: 0 }
  const LogoButton = await waitFor(() => findByTestId('tithenaiLogo'));
  userEvent.click(LogoButton, leftClick);
  ///// If you are logged in, you don't need these lines
 /* const element = await waitFor(() => findByText(/landing.sign_in/i));
  const leftClick = { button: 0 }
  userEvent.click(element, leftClick);
  await waitFor(() => findByText(/login_page.signin_to/i))

  const email = container.querySelector('input[name="email"]')
  const password = container.querySelector('input[name="password"]')
  await waitFor(() => {
    fireEvent.change(email, {
      target: {
        value: "mahasineldervis1@gmail.com"
      }
    })
  })
  await waitFor(() => {
    fireEvent.change(password, {
      target: {
        value: "testtest1234"
      }
    })
  })

  const login = await waitFor(() => findByText(/login.login_button/i));
  userEvent.click(login, leftClick); */
  await wait();
 // const thesesSection = await waitFor(() => findByText(/search_page.theses/i)) 
  const thesesSection = getByText(/search_page.theses/i);
  //const leftClick = { button: 0 }
  userEvent.click(thesesSection, leftClick);

  const searchInputField = container.querySelector('input[name="searchInputField"]')
  await waitFor(() => {
    fireEvent.change(searchInputField, {
      target: {
        value: "learning" 
      }
    })
  })
  const button = getByTestId('search-button');
  userEvent.click(button, leftClick);
  const checkSearchMethod = await waitFor(() => findByText(/sresults.resultsf/i))
  const thesisFound = await waitFor(() => findByText('How to use deep learning to train a deep learning model'))
  userEvent.click(thesisFound, leftClick);
  await wait();
  const checkView = await waitFor(() => findByText(/thesis.author/i))
}) 


test('Upload thesis page renders', async()=>{ //DONE
  const { getByText, getByRole, findAllByText, findByText, container, getByTestId } = render(<App/>);
  const leftClick = { button: 0 }
  const LogoButton = await waitFor(() => findByTestId('tithenaiLogo'));
  userEvent.click(LogoButton, leftClick);
  ///// If you are logged in, you don't need these lines
 /* const element = await waitFor(() => findByText(/landing.sign_in/i));
  const leftClick = { button: 0 }
  userEvent.click(element, leftClick);
  await waitFor(() => findByText(/login_page.signin_to/i))

  const email = container.querySelector('input[name="email"]')
  const password = container.querySelector('input[name="password"]')
  await waitFor(() => {
    fireEvent.change(email, {
      target: {
        value: "mahasineldervis1@gmail.com"
      }
    })
  })
  await waitFor(() => {
    fireEvent.change(password, {
      target: {
        value: "testtest1234"
      }
    })
  })

  const login = await waitFor(() => findByText(/login.login_button/i));
  userEvent.click(login, leftClick); */

  const uploadButton = await waitFor(() => findByText('navbar.upload')) 
  //const leftClick = { button: 0 }
  userEvent.click(uploadButton, leftClick);

  const checkItRenders = await waitFor(() => findByText(/uploadpage.upload/i))
}) 


test('search for theses', async()=>{ //DONE
  const { getByText, getByRole, findAllByText, findByText, container, getByTestId } = render(<App/>);
  const leftClick = { button: 0 }
  const LogoButton = await waitFor(() => findByTestId('tithenaiLogo'));
  userEvent.click(LogoButton, leftClick);
  ///// If you are logged in, you don't need these lines
 /* const element = await waitFor(() => findByText(/landing.sign_in/i));
  const leftClick = { button: 0 }
  userEvent.click(element, leftClick);
  await waitFor(() => findByText(/login_page.signin_to/i))

  const email = container.querySelector('input[name="email"]')
  const password = container.querySelector('input[name="password"]')
  await waitFor(() => {
    fireEvent.change(email, {
      target: {
        value: "mahasineldervis1@gmail.com"
      }
    })
  })
  await waitFor(() => {
    fireEvent.change(password, {
      target: {
        value: "testtest1234"
      }
    })
  })

  const login = await waitFor(() => findByText(/login.login_button/i));
  userEvent.click(login, leftClick);*/
  //const thesesSection = await waitFor(() => findByText(/Theses/i))
  //userEvent.click(thesesSection, leftClick);  
  const thesesSection = await waitFor(() => findByText('search_page.theses')) 
  userEvent.click(thesesSection, leftClick);

  const searchInputField = container.querySelector('input[name="searchInputField"]')
  await waitFor(() => {
    fireEvent.change(searchInputField, {
      target: {
        value: "learning" 
      }
    })
  })
  const button = getByTestId('search-button');
  userEvent.click(button, leftClick);
  const checkSearchMethod = await waitFor(() => findByText(/sresults.oops/i))
  expect (checkSearchMethod).toBeInTheDocument();
}) 

test('search for universities', async()=>{ 
  const { getByText, getByRole, findAllByText, findByText, container, getByTestId } = render(<App/>);
  const leftClick = { button: 0 }
  const LogoButton = await waitFor(() => findByTestId('tithenaiLogo'));
  userEvent.click(LogoButton, leftClick);
  ///// If you are logged in, you don't need these lines
 /* const element = await waitFor(() => findByText(/landing.sign_in/i));
  const leftClick = { button: 0 }
  userEvent.click(element, leftClick);
  await waitFor(() => findByText(/login_page.signin_to/i))

  const email = container.querySelector('input[name="email"]')
  const password = container.querySelector('input[name="password"]')
  await waitFor(() => {
    fireEvent.change(email, {
      target: {
        value: "mahasineldervis1@gmail.com"
      }
    })
  })
  await waitFor(() => {
    fireEvent.change(password, {
      target: {
        value: "testtest1234"
      }
    })
  })

  const login = await waitFor(() => findByText(/login.login_button/i));
  userEvent.click(login, leftClick);*/
  const universitiesSection = await waitFor(() => findByText('search_page.universities')) 
  userEvent.click(universitiesSection, leftClick);

  const searchInputField = container.querySelector('input[name="searchUniField"]')
  await waitFor(() => {
    fireEvent.change(searchInputField, {
      target: {
        value: "türk" 
      }
    })
  })
  const button = getByTestId('search-uni-button');
  userEvent.click(button, leftClick);
  const checkSearchMethod = await waitFor(() => findByText(/sresults.resultsf/i))
  expect (checkSearchMethod).toBeInTheDocument();
})


test('view university profile', async()=>{ 
  const { getByText, getByRole, findAllByText, findByText, container, getByTestId } = render(<App/>);
  const leftClick = { button: 0 }
  const LogoButton = await waitFor(() => findByTestId('tithenaiLogo'));
  userEvent.click(LogoButton, leftClick);
  ///// If you are logged in, you don't need these lines
  /*const element = await waitFor(() => findByText(/landing.sign_in/i));
  const leftClick = { button: 0 }
  userEvent.click(element, leftClick);
  await waitFor(() => findByText(/login_page.signin_to/i))

  const email = container.querySelector('input[name="email"]')
  const password = container.querySelector('input[name="password"]')
  await waitFor(() => {
    fireEvent.change(email, {
      target: {
        value: "mahasineldervis1@gmail.com"
      }
    })
  })
  await waitFor(() => {
    fireEvent.change(password, {
      target: {
        value: "testtest1234"
      }
    })
  })

  const login = await waitFor(() => findByText(/login.login_button/i));
  userEvent.click(login, leftClick);*/
  /////// 
  //const leftClick = { button: 0 }
  //const LogoButton = getByTestId('tithenaiLogo');
  //userEvent.click(LogoButton, leftClick);
  await wait()
  const universitiesSection = await waitFor(() => findByText('search_page.universities')) 
  userEvent.click(universitiesSection, leftClick);

  const searchInputField = container.querySelector('input[name="searchUniField"]')
  await waitFor(() => {
    fireEvent.change(searchInputField, {
      target: {
        value: "türk" 
      }
    })
  })
  const button = getByTestId('search-uni-button');
  userEvent.click(button, leftClick);
  const checkSearchMethod = await waitFor(() => findByText(/sresults.resultsf/i))
  expect (checkSearchMethod).toBeInTheDocument();
  const uniFound = await waitFor(() => findByText('TÜRK-ALMAN ÜNİVERSİTESİ'))
  userEvent.click(uniFound, leftClick);
  await wait();
  const checkView = getByText(/uni_info.noofmembers/i)
}) 

test('admin panel render', async () => {
  const { getByText, getByRole, findByTestId, findByText, container, findByRole, findByAltText, getByTestId, findByTitle } = render(<App />)
  const leftClick = { button: 0 }
  const LogoButton = await waitFor(() => findByTestId('tithenaiLogo'));
  userEvent.click(LogoButton, leftClick);
/*
  const element = await waitFor(() => findByText(/landing.sign_in/i));
  const leftClick = { button: 0 }
  userEvent.click(element, leftClick);
  await waitFor(() => findByText(/login_page.signin_to/i))

  const email = container.querySelector('input[name="email"]')
  const password = container.querySelector('input[name="password"]')
  await waitFor(() => {
    fireEvent.change(email, {
      target: {
        value: "mahasineldervis1@gmail.com"
      }
    })
  })
  await waitFor(() => {
    fireEvent.change(password, {
      target: {
        value: "testtest1234"
      }
    })
  })

  const login = await waitFor(() => findByText(/login.login_button/i));
  await waitFor(() => {userEvent.click(login, leftClick)}); */
  await wait();
 // const profileIcon = getByTestId('profile-icon');  
  const profileIcon = await wait(() => findByTestId(/profile-icon/i))
  //const leftClick = { button: 0 }
  await waitFor(() => {userEvent.click(profileIcon, leftClick)})
  const profileButton = await waitFor(() => findByText('navbar.admin_panel'))
  userEvent.click(profileButton, leftClick);
  await waitFor(() => findByText(/admin_panel.welcome/i));
})
jest.setTimeout(30000)