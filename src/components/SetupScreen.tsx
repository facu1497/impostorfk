import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { CATEGORIES } from '../data/words';

export const SetupScreen: React.FC = () => {
    const { state, dispatch } = useGame();
    const [newPlayerName, setNewPlayerName] = useState('');
    const [categoryId, setCategoryId] = useState(CATEGORIES[0].id);
    const [customWord, setCustomWord] = useState('');

    const handleAddPlayer = (e: React.FormEvent) => {
        e.preventDefault();
        if (newPlayerName.trim()) {
            dispatch({ type: 'ADD_PLAYER', payload: newPlayerName.trim() });
            setNewPlayerName('');
        }
    };

    const handleStartGame = () => {
        if (state.players.length < 3) return; // Min players check
        dispatch({
            type: 'START_GAME',
            payload: {
                categoryId,
                customWord: categoryId === 'custom' ? customWord : undefined
            }
        });
    };

    return (
        <div className="glass-panel">
            <h1>IMPOSTOR</h1>

            <div style={{ marginBottom: '2rem' }}>
                <h3>Jugadores ({state.players.length})</h3>
                <ul style={{ listStyle: 'none', padding: 0, maxHeight: '200px', overflowY: 'auto' }}>
                    {state.players.map(player => (
                        <li key={player.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                            <span>{player.name}</span>
                            <button
                                onClick={() => dispatch({ type: 'REMOVE_PLAYER', payload: player.id })}
                                style={{ background: 'none', border: 'none', color: 'var(--neon-red)', cursor: 'pointer' }}
                            >
                                ✕
                            </button>
                        </li>
                    ))}
                </ul>

                <form onSubmit={handleAddPlayer} style={{ display: 'flex', gap: '0.5rem' }}>
                    <Input
                        placeholder="Nombre del jugador"
                        value={newPlayerName}
                        onChange={(e) => setNewPlayerName(e.target.value)}
                        style={{ marginBottom: 0 }}
                    />
                    <Button type="submit" style={{ width: 'auto', padding: '0.8rem' }}>+</Button>
                </form>
            </div>

            <div style={{ marginBottom: '2rem' }}>
                <h3>Configuración</h3>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Impostores</label>
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                    <Button
                        variant="secondary"
                        onClick={() => dispatch({ type: 'SET_IMPOSTOR_COUNT', payload: Math.max(1, state.impostorCount - 1) })}
                    >-</Button>
                    <span style={{ fontSize: '1.5rem', alignSelf: 'center', width: '30px', textAlign: 'center' }}>{state.impostorCount}</span>
                    <Button
                        variant="secondary"
                        onClick={() => dispatch({ type: 'SET_IMPOSTOR_COUNT', payload: Math.min(state.players.length - 1, state.impostorCount + 1) })}
                    >+</Button>
                </div>

                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Categoría</label>
                <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                >
                    {CATEGORIES.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                </select>

                {categoryId === 'custom' && (
                    <Input
                        placeholder="Palabra Secreta"
                        value={customWord}
                        onChange={(e) => setCustomWord(e.target.value)}
                        type="password"
                    />
                )}
            </div>

            <Button
                onClick={handleStartGame}
                disabled={state.players.length < 3 || (categoryId === 'custom' && !customWord)}
                style={{ opacity: state.players.length < 3 ? 0.5 : 1 }}
            >
                COMENZAR PARTIDA
            </Button>

            <p style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.8rem', marginTop: '1rem' }}>
                Mínimo 3 jugadores
            </p>

            <div style={{
                marginTop: '1.5rem',
                marginBottom: '-1rem', // Pull closer to bottom
                paddingTop: '0.2rem',
                borderTop: '1px solid rgba(255,255,255,0.05)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                opacity: 0.9,
                width: '100%'
            }}>
                <p style={{
                    color: 'var(--text-secondary)',
                    fontSize: '0.6rem',
                    marginBottom: '0', // No bottom margin for text
                    letterSpacing: '1px',
                    textTransform: 'uppercase'
                }}>
                    Desarrollado por
                </p>
                <div style={{ marginTop: '-0.5rem' }}> {/* Negative margin to pull logo up */}
                    <img
                        src="/logo.png"
                        alt="Klaims Logo"
                        style={{
                            height: '140px',
                            filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.5)) brightness(1.2)' // Slightly brighter
                        }}
                    />
                </div>
            </div>
        </div>
    );
};
