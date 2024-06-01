<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

class Mailer {

    protected $mailer;

    function __construct($config)
    {
        loader_vendor();

        $this->mailer = new PHPMailer();
        $this->mailer->CharSet = 'UTF-8';
        $this->mailer->isSMTP();
        $this->mailer->SMTPDebug = $config['debug'];
        $this->mailer->SMTPAuth = true;
        $this->mailer->SMTPSecure = $config['ssl'];
        $this->mailer->Host = $config['host'];
        $this->mailer->Port = $config['port'];
        $this->mailer->Username = $config['user'];
        $this->mailer->Password = $config['pass'];
        $this->mailer->setFrom($config['email'], $config['name']);
        // $this->mailer->setLanguage('zh_cn');
    }

    // 邮件标题
    function setTitle($title)
    {
        $this->mailer->Subject = $title;
    }

    // 邮件内容
    function setContent($str, $ishtml = true)
    {
        if ( $ishtml )
        {
            $this->mailer->isHTML(true);
            $this->mailer->Body = $str;
        }
        else
        {
            $this->mailer->AltBody = $str;
        }
    }

    // 添加收件人邮箱
    function addAddress($emails)
    {
        if ( ! empty($emails) )
        {
            if ( is_array($emails) )
            {
                foreach ($emails as $email)
                {
                    $this->mailer->addAddress($email);
                }
            }
            else
            {
                $this->mailer->addAddress($emails);
            }
        }
    }

    // 添加抄送人邮箱
    function addCC($emails)
    {
        if ( ! empty($emails) )
        {
            if ( is_array($emails) )
            {
                foreach ($emails as $email)
                {
                    $this->mailer->addCC($email);
                }
            }
            else
            {
                $this->mailer->addCC($emails);
            }
        }
    }

    // 添加密送人邮箱
    function addBCC($emails)
    {
        if ( ! empty($emails) )
        {
            if ( is_array($emails) )
            {
                foreach ($emails as $email)
                {
                    $this->mailer->addBCC($email);
                }
            }
            else
            {
                $this->mailer->addBCC($emails);
            }
        }
    }

    // 添加附件
    function addAttachment($files)
    {
        if ( ! empty($files) )
        {
            if ( is_array($files) )
            {
                foreach ($files as $file)
                {
                    if ( is_file($file) )
                    {
                        $this->mailer->addAttachment($file);
                    }
                }
            }
            else
            {
                $this->mailer->addAttachment($files);
            }
        }
    }

    // 发送邮件
    function send()
    {
		try {
			
			if ( $this->mailer->Send() )
			{
				return true;
			}
			else
			{
				return false;
			}
			
		} catch (Exception $e) {
			
		    throw new Exception("Message could not be sent. Mailer Error: {$this->mailer->ErrorInfo}");
		}
    }

}
