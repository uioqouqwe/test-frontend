import React, { useState } from 'react';
import './ControlForm.scss';
import queryString from'query-string';
let tags = [];

const ControlForm = ({ imageUrls, setImageUrls, setGroup, setTags, tagName, setTagName }) => {
    const [error, setError] = useState({
        visibility: false,
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const [loadValue, setLoadValue] = useState('Загрузить');
    const [groupValue, setGroupValue] = useState('Группировать');

    const controlFormHandler = async (e) => {
        e.preventDefault();
        if (tagName === '') {
            setError({
                visibility: true,
                message: 'Заполните поле "тег"',
            });
            setTimeout(() => {
                setError({
                    visibility: false,
                    message: '',
                });
            }, 3000);
            return;
        }
        const stringified = queryString.stringify({
            apikey: 'R0Mua0BLMndE1oNznwILjEmBSS3fkWPn',
            tag: tagName,
        });
        try {
            setLoading(true);
            setLoadValue('Загрузка...');
            let pic = (await fetch('https://api.giphy.com/v1/gifs/random?' + stringified));
            pic = await pic.json();
            setLoading(false);
            setLoadValue('Загрузить');
            if (pic.data.image_url) {
                const picUrls = imageUrls;
                picUrls.push({
                    url: pic.data.image_url,
                    tagName
                });
                setImageUrls(picUrls);
                if (!tags.includes(tagName)) {
                    tags.push(tagName);
                    setTags(tags);
                }
                setError({
                    visibility: false,
                    message: '',
                });
                setTimeout(() => {
                    setError({
                        visibility: false,
                        message: '',
                    });
                }, 3000);
            }
            else {
                setError({
                    visibility: true,
                    message: 'По тегу ничего не найдено',
                });
                setTimeout(() => {
                    setError({
                        visibility: false,
                        message: '',
                    });
                }, 3000);
            }
        }
        catch(e) {
            setError({
                visibility: true,
                message: 'Произошла http ошибка',
            });
            setTimeout(() => {
                setError({
                    visibility: false,
                    message: '',
                });
            }, 3000);
        }
    };

    const cleanHandler = async () => {
        setTagName('');
        setTags([]);
        tags = [];
        setImageUrls([]);
    };
    const groupHandler = async () => {
        if (groupValue === 'Группировать') {
            setGroupValue('Разгруппировать');
            setGroup(true);
        }
        else {
            setGroupValue('Группировать');
            setGroup(false);
        }
    };

    return (
        <form className="control-form" onSubmit={controlFormHandler}>
            <div>
                {error.visibility ? <p className='http-error'>{error.message}</p> : ''}
                <input type='text'
                       placeholder='Введите название тега'
                       value={tagName}
                       onChange={(e) => setTagName(e.target.value)}
                       disabled={loading}/>
            </div>
            <input type='submit' value={loadValue} disabled={loading}/>
            <input type='button' value='Очистить' disabled={loading} onClick={cleanHandler}/>
            <input type='button' value={groupValue} disabled={loading} onClick={groupHandler}/>
        </form>
    );
}

export default ControlForm;