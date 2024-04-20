"""Initial revision

Revision ID: a01d095b221e
Revises: 
Create Date: 2024-04-20 19:23:34.090415

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'a01d095b221e'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('chats',
    sa.Column('uuid', sa.String(length=255), nullable=False),
    sa.PrimaryKeyConstraint('uuid')
    )
    op.create_index(op.f('ix_chats_uuid'), 'chats', ['uuid'], unique=False)
    op.create_table('users',
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('name', sa.String(length=100), nullable=False),
    sa.Column('password_hash', sa.String(length=100), nullable=False),
    sa.PrimaryKeyConstraint('email')
    )
    op.create_index(op.f('ix_users_email'), 'users', ['email'], unique=False)
    op.create_table('messages',
    sa.Column('uuid', sa.String(length=255), nullable=False),
    sa.Column('author_email', sa.String(length=255), nullable=False),
    sa.Column('chat_uuid', sa.String(length=255), nullable=False),
    sa.Column('content', sa.String(length=1000), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['author_email'], ['users.email'], ),
    sa.ForeignKeyConstraint(['chat_uuid'], ['chats.uuid'], ),
    sa.PrimaryKeyConstraint('uuid')
    )
    op.create_index(op.f('ix_messages_uuid'), 'messages', ['uuid'], unique=False)
    op.create_table('projects',
    sa.Column('uuid', sa.String(length=255), nullable=False),
    sa.Column('title', sa.String(length=200), nullable=False),
    sa.Column('description', sa.String(length=1000), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('owner_email', sa.String(length=255), nullable=False),
    sa.Column('chat_uuid', sa.String(length=255), nullable=False),
    sa.ForeignKeyConstraint(['chat_uuid'], ['chats.uuid'], ),
    sa.ForeignKeyConstraint(['owner_email'], ['users.email'], ),
    sa.PrimaryKeyConstraint('uuid')
    )
    op.create_index(op.f('ix_projects_uuid'), 'projects', ['uuid'], unique=False)
    op.create_table('sessions',
    sa.Column('id', sa.String(length=255), nullable=False),
    sa.Column('user_email', sa.String(length=255), nullable=False),
    sa.Column('expires_at', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['user_email'], ['users.email'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_sessions_id'), 'sessions', ['id'], unique=False)
    op.create_table('project-members',
    sa.Column('project_uuid', sa.String(length=255), nullable=False),
    sa.Column('user_email', sa.String(length=255), nullable=False),
    sa.ForeignKeyConstraint(['project_uuid'], ['projects.uuid'], ),
    sa.ForeignKeyConstraint(['user_email'], ['users.email'], ),
    sa.PrimaryKeyConstraint('project_uuid', 'user_email')
    )
    op.create_table('tasks',
    sa.Column('uuid', sa.String(length=255), nullable=False),
    sa.Column('title', sa.String(length=200), nullable=False),
    sa.Column('description', sa.String(length=1000), nullable=False),
    sa.Column('project_uuid', sa.String(length=255), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('planned_minutes', sa.Integer(), nullable=True),
    sa.Column('actual_minutes', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['project_uuid'], ['projects.uuid'], ),
    sa.PrimaryKeyConstraint('uuid')
    )
    op.create_index(op.f('ix_tasks_uuid'), 'tasks', ['uuid'], unique=False)
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index(op.f('ix_tasks_uuid'), table_name='tasks')
    op.drop_table('tasks')
    op.drop_table('project-members')
    op.drop_index(op.f('ix_sessions_id'), table_name='sessions')
    op.drop_table('sessions')
    op.drop_index(op.f('ix_projects_uuid'), table_name='projects')
    op.drop_table('projects')
    op.drop_index(op.f('ix_messages_uuid'), table_name='messages')
    op.drop_table('messages')
    op.drop_index(op.f('ix_users_email'), table_name='users')
    op.drop_table('users')
    op.drop_index(op.f('ix_chats_uuid'), table_name='chats')
    op.drop_table('chats')
    # ### end Alembic commands ###