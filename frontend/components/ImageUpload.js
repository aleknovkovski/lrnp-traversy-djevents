import { useState } from 'react'
import { API_URL } from '@/config'
import styles from '@/styles/Form.module.css'

export default function ImageUpload({ evtId, imageUploaded }) {
    const [image, setImage] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('files', image)
        formData.append('ref', 'api::event.event')
        formData.append('refId', evtId)
        formData.append('field', 'image')
        for (const pair of formData.entries()) {
            console.log(pair[0]+ ', ' + pair[1]);
        }

        const res = await fetch(`${API_URL}/upload`, {
            method: 'POST',
            body: formData,
        })

        if (res.ok) {
            imageUploaded()
        }
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        console.log(file)
        setImage(file)
    }

    return (
        <div className={styles.form}>
            <h1>Upload Event Image</h1>
            <form onSubmit={handleSubmit}>
                <div className={styles.file}>
                    <input type='file' onChange={handleFileChange} />
                </div>
                <input type='submit' value='Upload' className='btn' />
            </form>
        </div>
    )
}
