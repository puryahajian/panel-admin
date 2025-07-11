import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import GeneralModal from './modal-general.jsx';

describe('GeneralModal Component', () => {
  test('renders modal with title and children correctly', () => {
    render(
      <GeneralModal open={true} title="Test Title" onClose={() => {}}>
        Test Content
      </GeneralModal>
    );
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  test('calls onClose when reject button is clicked', async () => {
    const handleClose = jest.fn();
    render(
      <GeneralModal
        open={true}
        title="Test Title"
        onClose={handleClose}
        handleClose={handleClose}
        exitButton="خیر"
      >
        Test Content
      </GeneralModal>
    );
    const rejectButton = screen.getByText('خیر');
    await userEvent.click(rejectButton);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  test('calls actionHandler when action button is clicked', async () => {
    const actionHandler = jest.fn();
    render(
      <GeneralModal
        open={true}
        title="Test Title"
        onClose={() => {}}
        actionText="تأیید"
        actionHandler={actionHandler}
      >
        Test Content
      </GeneralModal>
    );
    const actionButton = screen.getByRole('button', { name: /تأیید/i });
    await userEvent.click(actionButton);
    expect(actionHandler).toHaveBeenCalledTimes(1);
  });

  test('does not render modal when open is false', () => {
    render(
      <GeneralModal open={false} title="Test Title" onClose={() => {}}>
        Test Content
      </GeneralModal>
    );
    expect(screen.queryByText('Test Title')).not.toBeInTheDocument();
    expect(screen.queryByText('Test Content')).not.toBeInTheDocument();
  });

  test('modal is accessible and has correct aria attributes', () => {
    render(
      <GeneralModal open={true} title="Test Title" onClose={() => {}}>
        Test Content
      </GeneralModal>
    );
    const modalContent = screen.getByRole('presentation');
    expect(modalContent).toBeInTheDocument();
    expect(modalContent).toHaveAttribute('aria-labelledby', 'transition-modal-title');
    expect(modalContent).toHaveAttribute('aria-describedby', 'transition-modal-description');
  });

  test('applies custom classes correctly', () => {
    render(
      <GeneralModal
        open={true}
        title="Test Title"
        onClose={() => {}}
        actionText="تأیید"
        classTitle="custom-title"
        classAccept="custom-accept"
        classReject="custom-reject"
        classBtn="custom-btn-group"
      >
        Test Content
      </GeneralModal>
    );
    const title = screen.getByText('Test Title');
    const acceptButton = screen.getByRole('button', { name: /تأیید/i });
    const buttonGroup = screen.getByTestId('button-group');

    expect(title).toHaveClass('custom-title');
    expect(acceptButton).toHaveClass('custom-accept');
    expect(buttonGroup).toHaveClass('custom-btn-group');
  });
});