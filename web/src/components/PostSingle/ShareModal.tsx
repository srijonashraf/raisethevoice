import { message, ModalProps } from 'antd';
import { Button, Modal } from 'lib';

type ShareModalProps = ModalProps & {
  url: string;
};

enum SocialMedia {
  FACEBOOK = 'FACEBOOK',
  X = 'X',
  TELEGRAM = 'TELEGRAM',
  REDDIT = 'REDDIT',
  LINKEDIN = 'LINKEDIN',
  PINTEREST = 'PINTEREST',
  WHATSAPP = 'WHATSAPP',
}

export default function ShareModal({ url, ...props }: ShareModalProps) {
  const handleSocialShare = (type: SocialMedia) => () => {
    let shareUrl = '';
    const caption = 'Check+this+out!';

    if (type === SocialMedia.FACEBOOK) {
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    } else if (type === SocialMedia.X) {
      shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${caption}`;
    } else if (type === SocialMedia.TELEGRAM) {
      shareUrl = `https://t.me/share/url?url=${url}&text=${caption}`;
    } else if (type === SocialMedia.REDDIT) {
      shareUrl = `https://reddit.com/submit?url=${url}&title=${caption}`;
    } else if (type === SocialMedia.LINKEDIN) {
      shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
    } else if (type === SocialMedia.PINTEREST) {
      shareUrl = `https://pinterest.com/pin/create/button/?url=${url}&media=https://avatars.githubusercontent.com/u/177571217?s=200&v=4&description=${caption}`;
    } else if (type === SocialMedia.WHATSAPP) {
      shareUrl = `https://wa.me/?text=${url}`;
    } else {
      return;
    }

    window.open(shareUrl);
  };

  const handleCopy = () => {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        message.success('Link copied to clipboard');
      })
      .catch((err) => {
        message.error('Failed to copy link: ', err);
      });
  };

  return (
    <Modal {...props}>
      <h5 className="text-base">Share</h5>
      <div className="pt-4 flex items-center gap-3">
        <SocialIcon
          src="socials/facebook.png"
          onClick={handleSocialShare(SocialMedia.FACEBOOK)}
        />
        <SocialIcon
          src="socials/twitter.png"
          onClick={handleSocialShare(SocialMedia.X)}
        />
        <SocialIcon
          src="socials/whatsapp.png"
          onClick={handleSocialShare(SocialMedia.WHATSAPP)}
        />
        <SocialIcon
          src="socials/reddit.png"
          onClick={handleSocialShare(SocialMedia.REDDIT)}
        />
        <SocialIcon
          src="socials/telegram.png"
          onClick={handleSocialShare(SocialMedia.TELEGRAM)}
        />
        <SocialIcon
          src="socials/linkedin.png"
          onClick={handleSocialShare(SocialMedia.LINKEDIN)}
        />
        <SocialIcon
          src="socials/pinterest.png"
          onClick={handleSocialShare(SocialMedia.PINTEREST)}
        />
      </div>
      <div className="border rounded-lg mt-10 flex items-center pl-4 pr-3 py-2 justify-between">
        {url}
        <Button className="rounded-full py-1.5" onClick={handleCopy}>
          Copy
        </Button>
      </div>
    </Modal>
  );
}

type SocialIconProps = {
  src: string;
  onClick: any;
};

const SocialIcon = (props: SocialIconProps) => {
  return <img className="w-14 h-14 rounded-full cursor-pointer" {...props} />;
};
