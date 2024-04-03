import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

interface Position {
    _id: string;
    title: string;
}

interface FormData {
    lastName: string;
    firstName: string;
    middleName: string;
    positionId: string;
    isActive: boolean;
}

function AddEmployeeForm() {
    const { projectId } = useParams<{ projectId: string }>();
    const [formData, setFormData] = useState<FormData>({
        lastName: '',
        firstName: '',
        middleName: '',
        positionId: '',
        isActive: true
    });
    const [positions, setPositions] = useState<Position[]>([]);

    useEffect(() => {
        axios.get<Position[]>(`http://localhost:3001/positions`)
            .then(response => {
                setPositions(response.data);
            })
            .catch(error => {
                console.error('Ошибка при загрузке списка должностей:', error);
            });
    }, []);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const inputValue = type === 'checkbox' ? !formData.isActive : value; // Изменено на !formData.isActive
        setFormData(prevState => ({
            ...prevState,
            [name]: inputValue
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await axios.post<void>(`http://localhost:3001/addEmployee/${projectId}`, formData);
            console.log('Сотрудник успешно добавлен к проекту');
        } catch (error) {
            console.error('Ошибка при добавлении сотрудника к проекту:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Фамилия:
                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
            </label>
            <br />
            <label>
                Имя:
                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
            </label>
            <br />
            <label>
                Отчество:
                <input type="text" name="middleName" value={formData.middleName} onChange={handleChange} required />
            </label>
            <br />
            <label>
                Должность:
                <select name="positionId" value={formData.positionId} onChange={handleChange} >
                    <option value="">Выберите должность</option>
                    {positions.map(position => (
                        <option key={position._id} value={position._id}>{position.title}</option>
                    ))}
                </select>
            </label>
            <br />
            <label>
                Активный:
                <input type="checkbox" name="isActive" checked={formData.isActive} onChange={handleChange} />
            </label>
            <br />
            <button type="submit">Добавить сотрудника</button>
        </form>
    );
}

export default AddEmployeeForm;