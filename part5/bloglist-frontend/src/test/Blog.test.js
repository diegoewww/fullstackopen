import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Blog from '../components/Blog';
import BlogForm from '../components/BlogForm'

const user = { name: 'Test User' };

const blog = {
  id: '1',
  title: 'Test Blog',
  author: 'Test Author',
  url: 'http://test-url.com',
  likes: 10,
  user: { name: 'Test User' },
};

test('renders title and author by default without URL and likes', () => {
  const { getByText, queryByText } = render(
    <Blog blog={blog} user={user} handleLike={() => {}} handleDelete={() => {}} />
  );

  // Verifica que la URL y los likes no estén presentes
  expect(queryByText(`URL: ${blog.url}`)).toBeNull();
  expect(queryByText(`Likes: ${blog.likes}`)).toBeNull();
});

test('shows URL and likes when "Show Details" button is clicked', () => {
  const { getByText, queryByText } = render(
    <Blog blog={blog} user={user} handleLike={() => {}} handleDelete={() => {}} />
  );

  // Verifica que la URL y los likes no estén presentes inicialmente
  expect(queryByText(`URL: ${blog.url}`)).toBeNull();
  expect(queryByText(`Likes: ${blog.likes}`)).toBeNull();

  // Hace clic en el botón "Show Details"
  fireEvent.click(getByText('Show Details'));

  // Imprime el contenido del componente para depuración
  console.log(document.body.innerHTML);

  // Verifica que la URL y los likes estén presentes después de hacer clic en el botón "Show Details"
  expect(getByText(`URL: ${blog.url}`)).toBeInTheDocument();
  expect(getByText(`Likes: ${blog.likes}`)).toBeInTheDocument();
});

test('calls handleLike twice when "Like" button is clicked twice', () => {
  // Mock the handleLike function
  const mockHandleLike = jest.fn();

  const blog = {
    id: '1',
    title: 'Test Blog',
    author: 'Test Author',
    url: 'http://test-url.com',
    likes: 10,
    user: {
      name: 'Test User',
    },
  };

  const user = {
    name: 'Test User',
  };

  // Render the component with the mocked handleLike function
  const { getByText } = render(
    <Blog blog={blog} user={user} handleLike={mockHandleLike} handleDelete={() => {}} />
  );
  fireEvent.click(getByText('Show Details'));

  // Click the "Like" button twice
  fireEvent.click(getByText('Like'));
  fireEvent.click(getByText('Like'));

  // Verify that handleLike was called twice with the correct blog ID
  expect(mockHandleLike).toHaveBeenCalledTimes(2);
  expect(mockHandleLike).toHaveBeenCalledWith(blog.id);
});

test('calls handleNewBlog with correct details when creating a new blog', () => {
  const mockHandleNewBlog = jest.fn();

  const { getByLabelText, getByText, container } = render(
    <BlogForm handleNewBlog={mockHandleNewBlog} />
  );

  const author = container.querySelector('#author');
  const title = container.querySelector('#title');
  const url = container.querySelector('#url');

  fireEvent.change(author, { 
    target: { value: 'Test Author' } 
  })
  fireEvent.change(title, { 
    target: { value: 'Test Blog' } 
  })
  fireEvent.change(url, { 
    target: { value: 'http://test-url.com' } 
  })

  fireEvent.click(getByText('create'));

  expect(mockHandleNewBlog).toHaveBeenCalledWith({
    title: 'Test Blog',
    author: 'Test Author',
    url: 'http://test-url.com',
  });
});